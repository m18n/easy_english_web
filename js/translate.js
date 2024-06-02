$(document).ready(function() {
    console.log(current_lang_id);
    $('li.item_from_list[value="141"]').click();
    $('li.item_into_list[value="'+current_lang_id+'"]').click();
    $("#speak_checkbox").click();
    $("#formal_checkbox").click();
    $("#cut_down_checkbox").click();
    

  });
  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';  // Відсутність видимості на екрані
    textArea.style.opacity = '0';       // Зробити невидимим
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'успішно' : 'не вдалося';
        console.log('Копіювання тексту було ' + msg);
    } catch (err) {
        console.error('Помилка при копіюванні через execCommand: ', err);
    }

    document.body.removeChild(textArea);
}
function copy(element){
    let textToCopy=$(element).siblings('.trans_item').text();
    copyTextToClipboard(textToCopy);
    
 
}
function swap_lang(element){
    let id_from=$(".s_item_from").attr("value");
    let id_into=$(".s_item_into").attr("value");
    $('li.item_from_list[value="'+id_into+'"]').click();
    $('li.item_into_list[value="'+id_from+'"]').click();
}
async function translated() {
    $(".trans_item").text("");
    const item_from = $(".s_item_from").text();
    const item_into = $(".s_item_into").text();
    const translate_text = $("#translate_text").val();
    const translate_explain = $("#translate_explain").val();

    const text_deepl = await translate_deepl(item_from, item_into, translate_text);
    $("#deepl_translated").text(text_deepl);

    const text_deepl_check = await translate_deepl(item_into, item_from, text_deepl);
    $("#deepl_translated_check").text(text_deepl_check);

    const tasks = [];
    let is_full=false;
    if ($("#cut_down_checkbox").is(':checked')) {
        is_full=false;
        if ($("#speak_checkbox").is(':checked')) {
            tasks.push(handleTranslation("speak", "short", item_from, item_into, translate_text, translate_explain));
        }
        if ($("#formal_checkbox").is(":checked")) {
            tasks.push(handleTranslation("formal", "short", item_from, item_into, translate_text, translate_explain));
        }
    } else {
        is_full=true;
        if ($("#speak_checkbox").is(':checked')) {
            tasks.push(handleTranslation("speak", "full", item_from, item_into, translate_text, translate_explain));
        }
        if ($("#formal_checkbox").is(":checked")) {
            tasks.push(handleTranslation("formal", "full", item_from, item_into, translate_text, translate_explain));
        }
    }

    await Promise.all(tasks);

    const id_from_lang = parseInt($(".s_item_from").attr("value"));
    const id_into_lang = parseInt($(".s_item_into").attr("value")); //gpt_tr.translate, gpt_check_translated, gpt_tr.explanation
    await save_translated(id_from_lang, id_into_lang, translate_text, translate_explain, text_deepl, text_deepl_check,
         $(".speak_lang #gpt_translated").text(),$(".speak_lang #gpt_translated_check").text(), $(".speak_lang #gpt_explanation").text(),
         $(".formal_lang #gpt_translated").text(),$(".formal_lang #gpt_translated_check").text(), $(".formal_lang #gpt_explanation").text(),is_full);
}

async function handleTranslation(type, length, item_from, item_into, translate_text, translate_explain) {
    const translateFunction = length === "short" ?
        (type === "speak" ? translate_gpt_short_speak : translate_gpt_short_formal) :
        (type === "speak" ? translate_gpt_full_speak : translate_gpt_full_formal);

    const gpt_tr = await translateFunction(item_from, item_into, translate_text, translate_explain);
    const gpt_check_translated = await translate_deepl(item_into, item_from, gpt_tr.translate);

    $(`.${type}_lang #gpt_translated`).text(gpt_tr.translate);
    $(`.${type}_lang #gpt_translated_check`).text(gpt_check_translated);
    $(`.${type}_lang #gpt_explanation`).text(gpt_tr.explanation);
}
/* async function translated(){
    $(".trans_item").text("");
    let item_from=$(".s_item_from").text();
    let item_into=$(".s_item_into").text();
    let translate_text=$("#translate_text").val();
    let translate_explain=$("#translate_explain").val();
    let text_deepl=await translate_deepl(item_from,item_into,translate_text);
    $("#deepl_translated").text(text_deepl);
    let text_deepl_check=await translate_deepl(item_into,item_from,text_deepl);
    $("#deepl_translated_check").text(text_deepl_check);
    let any=false;
    let formal=false;
    let gpt_tr;
    let gpt_check_translated;
    if($("#cut_down_checkbox").is(':checked')){
        if($("#speak_checkbox").is(':checked')){
            gpt_tr=await translate_gpt_short_speak(item_from,item_into,translate_text,translate_explain);
            gpt_check_translated=await translate_deepl(item_into,item_from,gpt_tr.translate);
            $(".speak_lang #gpt_translated").text(gpt_tr.translate);
            $(".speak_lang #gpt_translated_check").text(gpt_check_translated);
            $(".speak_lang #gpt_explanation").text(gpt_tr.explanation);
        }
        if($("#formal_checkbox").is(":checked")){
            gpt_tr=await translate_gpt_short_formal(item_from,item_into,translate_text,translate_explain);
            gpt_check_translated=await translate_deepl(item_into,item_from,gpt_tr.translate);
            $(".formal_lang #gpt_translated").text(gpt_tr.translate);
            $(".formal_lang #gpt_translated_check").text(gpt_check_translated);
            $(".formal_lang #gpt_explanation").text(gpt_tr.explanation);
        }
       
    }else{
        if($("#speak_checkbox").is(':checked')){
            gpt_tr=await translate_gpt_full_speak(item_from,item_into,translate_text,translate_explain);
            gpt_check_translated=await translate_deepl(item_into,item_from,gpt_tr.translate);
            $(".speak_lang #gpt_translated").text(gpt_tr.translate);
            $(".speak_lang #gpt_translated_check").text(gpt_check_translated);
            $(".speak_lang #gpt_explanation").text(gpt_tr.explanation);
        }

        if($("#formal_checkbox").is(":checked")){
            gpt_tr=await translate_gpt_full_formal(item_from,item_into,translate_text,translate_explain);
            gpt_check_translated=await translate_deepl(item_into,item_from,gpt_tr.translate);
            $(".formal_lang #gpt_translated").text(gpt_tr.translate);
            $(".formal_lang #gpt_translated_check").text(gpt_check_translated);
            $(".formal_lang #gpt_explanation").text(gpt_tr.explanation);
        }
    }
    
    
    let id_from_lang=parseInt($(".s_item_from").attr("value"));
    let id_into_lang=parseInt($(".s_item_into").attr("value"));
    // await save_translated(id_from_lang,id_into_lang,translate_text,translate_explain,text_deepl,
    //     text_deepl_check,gpt_tr.translate,gpt_check_translated,gpt_tr.explanation);
}*/
function clear_text(){
    $("#translate_text").val("");
    $("#translate_explain").val("");
}
function speake_checkbox(element){
    if ($(element).is(':checked')) {
        $(".speak_lang").removeClass("none");
    } else {
        $(".speak_lang").addClass("none");
    }
}
function formal_checkbox(element){
    if ($(element).is(':checked')) {
        $(".formal_lang").removeClass("none");
    } else {
        $(".formal_lang").addClass("none");
    }
}
function cutdown_checkbox(element){
    if ($(element).is(':checked')) {
        
    } else {
        
    }
}
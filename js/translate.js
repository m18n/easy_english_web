$(document).ready(function() {
    console.log(current_lang_id);
    $('li.item_from_list[value="141"]').click();
    $('li.item_into_list[value="'+current_lang_id+'"]').click();
  });
  
function swap_lang(element){
    let id_from=$(".s_item_from").attr("value");
    let id_into=$(".s_item_into").attr("value");
    $('li.item_from_list[value="'+id_into+'"]').click();
    $('li.item_into_list[value="'+id_from+'"]').click();
}
async function translated(){
    $(".trans_item").text("");
    let item_from=$(".s_item_from").text();
    let item_into=$(".s_item_into").text();
    let translate_text=$("#translate_text").val();
    let text_deepl=await translate_deepl(item_from,item_into,translate_text);
    $("#deepl_translated").text(text_deepl);
    let text_deepl_check=await translate_deepl(item_into,item_from,text_deepl);
    $("#deepl_translated_check").text(text_deepl_check);
    let gpt_tr=await translate_gpt(item_from,item_into,translate_text);
    $("#gpt_translated").text(gpt_tr.translate);
    let gpt_check_translated=await translate_deepl(item_into,item_from,gpt_tr.translate);
    $("#gpt_translated_check").text(gpt_check_translated);
    $("#gpt_explanation").text(gpt_tr.explanation);
}
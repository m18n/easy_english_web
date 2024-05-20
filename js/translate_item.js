function back_page(){
    window.history.back();
}
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
    let textToCopy=$(element).siblings('.text').text();
    copyTextToClipboard(textToCopy);
    
 
}
async function delete_item(){
    
    await delete_history_item(current_id);
    back_page();
}
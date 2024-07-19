$(document).ready(function() {
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = segments[segments.length - 1]; // Взяти останній елемент, який є номером сторінки
    $(".first_page").text(pageNumber);
    $(".pointer").css('background-color', "#827ffe");
    $(".item_sentence[value="+index_dump+"]").find(".pointer").css('background-color', 'rgb(47, 207, 47)');
});
function go_back(){
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = parseInt(segments[segments.length - 1]);
    if (pageNumber>1){
        pageNumber=pageNumber-1;
        document.location.href="/view/userspace/dictionary/p/"+pageNumber;
    } 
    
}
function go_next(){
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = parseInt(segments[segments.length - 1])+1; 
    document.location.href="/view/userspace/dictionary/p/"+pageNumber;

}
function go_first(){
    document.location.href="/view/userspace/dictionary/p/1";

}
async function delete_item(element){
    let id=parseInt($(element).closest('.item_sentence').attr("value"));
    await delete_dict_item(id);
    document.location.href=document.location.href;
}
async function set_item(element){
    let id=parseInt($(element).closest('.item_sentence').attr("value"));
    $(".pointer").css('background-color', "#827ffe");
    $(element).css('background-color', 'rgb(47, 207, 47)');
    await set_indexdump(id);
    document.location.href=document.location.href;
}
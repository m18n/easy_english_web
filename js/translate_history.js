$(document).ready(function() {
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = segments[segments.length - 1]; // Взяти останній елемент, який є номером сторінки
    $(".first_page").text(pageNumber);
    
});
function go_back(){
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = parseInt(segments[segments.length - 1]);
    if (pageNumber>1){
        pageNumber=pageNumber-1;
        document.location.href="/view/userspace/translate/history/p/"+pageNumber;
    } 
    
}
function go_next(){
    var url = window.location.href; // Взяти поточний URL
    var segments = url.split('/');  // Розділити URL на частини
    var pageNumber = parseInt(segments[segments.length - 1])+1; 
    document.location.href="/view/userspace/translate/history/p/"+pageNumber;

}
function go_first(){
    document.location.href="/view/userspace/translate/history/p/1";

}
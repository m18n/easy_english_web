$(document).ready(function() {
    // Обробник кліка для відкриття/закриття випадаючого списку
    // $('.dropdown-select').click(function() {
    //   $('.dropdown-list').toggle();
    // });
  
    // Обробник кліка для вибору опції із списку
    // $('.dropdown-list li').click(function() {
    //   $('.dropdown-select span').text($(this).text());
    //   $('.dropdown-select span').attr("value",$(this).attr("value"));
    //   $('.dropdown-list').hide();
    // });
    $('.add_lang').click(function() {
        let select=$('.select_base').clone();
        $(select).removeClass("none");
        $(select).removeClass("select_base");
        $(select).appendTo('.langs');
      });
  });
  function select(element){
    $('.dropdown-list').hide();
    let main_dropdown=$(element).closest('.dropdown');
    $(main_dropdown).find(".dropdown-list").toggle();
  }
  function select_option(element){
    let main_dropdown=$(element).closest('.dropdown');
    $(main_dropdown).find(".dropdown-select span").text($(element).text());
    $(main_dropdown).find(".dropdown-select span").attr("value",$(element).attr("value"));
    $(main_dropdown).find(".dropdown-list").hide();
  }
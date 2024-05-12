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
function auth(){
    var json_input =$('#auth :input').serializeArray();
   
    var authdata = {
        user_name: json_input[0]["value"],
        password: json_input[1]["value"],
    };
    let formData=JSON.stringify(authdata);
    console.log(formData+"\n");
    $.ajax({
        type: "POST",
        url: "/api/auth",
        data: formData,
        success: function(data){
            if(data.hasOwnProperty("error")){
                if(data["error"]==true){
                document.location.href = '/settings/error';
                }else{
                    document.location.href = '/view/login';
                }
            }else{
                if(data["status"]==true){
                    document.location.href = '/view/userspace/main';
                }else{
                    $(".user_name").addClass("wrong_auth_info");
                    $(".password").addClass("wrong_auth_info");
                    setTimeout(function() {
                        $('.user_name').removeClass('wrong_auth_info');
                        $('.password').removeClass('wrong_auth_info');
                    }, 1500); 
                }
            }
        },
        dataType: "json",
        contentType : "application/json"
    });
}
function save_dictionaries(){
    var divArray = [];

    // Використовуємо jQuery для вибору всіх елементів з класом "exampleClass" і додавання їх до масиву
    $(".dropdown_lang").each(function() {
        divArray.push($(this));
    });
    var dictionaries_array=[];
    divArray.forEach(function(divElement) {
        // Знаходимо елементи з класом ".selection" всередині поточного divElement
        var dictionary_info = divElement.find(".dictionary_info");
        dictionaries_array.push(parseInt($(dictionary_info).attr("value")));
        // Тепер в selectionElements ви маєте масив з усіма елементами з класом ".selection",
        // які є дочірніми елементами поточного divElement
    });
    var dictionaries = {
        dictionaries_id:dictionaries_array
    };
    let formData=JSON.stringify(dictionaries);
    console.log(formData+"\n");
    $.ajax({
        type: "POST",
        url: "/api/userstart/setdictionaries",
        data: formData,
        success: function(data){
            if(data.hasOwnProperty("error")){
                if(data["error"]==true){
                document.location.href = '/settings/error';
                }else{
                    document.location.href = '/view/login';
                }
            }else{
              
                document.location.href = '/view/userspace/main';
                
            }
        },
        dataType: "json",
        contentType : "application/json"
    });
}
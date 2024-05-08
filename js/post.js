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
                document.location.href = '/settings/error';
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
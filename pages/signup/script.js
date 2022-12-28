
const SIGNUP_API = "../../api/signup.php";
// const IMAGE_UPLOADER_API = "../../api/uploader.php";

function store()
{
    let userForm = {
		firstname : $("#firstname").val(),
        lastname : $("#lastname").val(),
        username : $("#username").val(),
        position : $("#position").val(),
        password: $("#password").val(),
        confirm_password : $("#confirm_password").val(),
        // profile_pic : $("profile_pic").val(),
	}

    $.ajax({
        "url" : SIGNUP_API ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(userForm),
        "success" : function(response) {

            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);
            
            return false;
        }
    })

    return false;
}

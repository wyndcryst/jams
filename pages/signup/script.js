
const SIGNUP_API = "../../api/signup.php";
const IMAGE_UPLOADER_API = "../../api/uploader_sign-up.php";

function store()
{
    let userForm = {
		firstname : $("#firstname").val(),
        lastname : $("#lastname").val(),
        username : $("#username").val(),
        position : $("#position").val(),
        password: $("#password").val(),
        confirm_password : $("#confirm_password").val(),
	}

    $.ajax({
        "url" : SIGNUP_API ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(userForm),
        "success" : function(response) {

            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            if (responseJSON.code == 200) {
                window.location.href = "../login";
            }
            
            return false;
        }
    })

    return false;
}

function uploadImage() 
{
    let image = new FormData();
    image.append("image_file", $("#profile_pic")[0].files[0])
    // image.append("data", "your value");

     $.ajax({
        "url" : IMAGE_UPLOADER_API ,
        "type" : "POST",
        "data" : image,
        "enctype" : "multipart/form-data",
        "cache" : false,
        "contentType" : false,
        "processData" : false,
        "success": function (response)
        {
            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            // getProfilePic();
            
            return false;
        }
    })
}
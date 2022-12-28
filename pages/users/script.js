
const USERS_API = "../../api/users.php";
// const IMAGE_UPLOADER_API = "../../api/uploader.php";

//Get all information
index();
function index()
{
    $.ajax({
        url: USERS_API,
        type: "POST",
        data: "index",
        success: function(response) {
            
            let jsonParse = JSON.parse(response)
            let tr = '';

            for (var i = 0; i<jsonParse.records.length; i++) 
            {
                tr += "<tr>" +
                    "<td>" + jsonParse.records[i].firstname + "</td>" + 
                    "<td>" + jsonParse.records[i].lastname + "</td>" + 
                    "<td>" + jsonParse.records[i].username + "</td>" + 
                    "<td>" + jsonParse.records[i].position + "</td>" + 
                    "<td>" + jsonParse.records[i].password + "</td>" + 
                    // "<td>" + jsonParse.records[i].profile_pic + "</td>" + 
                    "<td>" + jsonParse.records[i].timestamp + "</td>" + 

                    "<td><button onclick='goToView(" +jsonParse.records[i].id+ ")'>EDIT</button>&nbsp;"+
                    "<button onclick='destroy(" +jsonParse.records[i].id+ ")'>DELETE</button></td>" + 
                "</tr>";
            }
            
            $("#records").html(tr)
        }
    })
}


//! Redirected to view.html as an UPDATE page
function show(id)
{
    $.ajax({
        url: USERS_API,
        type: "POST",
        data: "show&id=" + id,
        success: function (response) {
            
            let jsonParse = JSON.parse(response)

            $("#firstname").val(jsonParse.records.firstname);
            $("#lastname").val(jsonParse.records.lastname);
            $("#username").val(jsonParse.records.username);
            $("#position").val(jsonParse.records.position);
            $("#password").val(jsonParse.records.password);
            // $("#profile_pic").val(jsonParse.records.profile_pic);
        },
    });
}

//! This is onclick function for index action button
function goToView(id)
{
    window.location.href = 'view.html?id=' + id;
}

//!Saving a record
function store()
{
    let userForm = {
		firstname : $("#firstname").val(),
        lastname : $("#lastname").val(),
        username: $("#username").val(),
        position : $("#position").val(),
        password: $("#password").val(),
        confirm_password : $("#confirm_password").val(),
        // profile_pic : $("profile_pic").val(),
	}

    $.ajax({
        "url" : USERS_API ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(userForm),
        "success" : function(response) {

            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            index();
            
            return false;
        }
    })

    return false;
}

function destroy(id)
{

    if (!confirm("Are you sure you want to delete?"))
    {
        return;
    }

    $.ajax({
        "url" : USERS_API ,
        "type" : "POST",
        "data" : "destroy&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            index();
            
            return false;
        }
    })
}

function update(id)
{
    //@TODO Change json collections
    let userFormUpdate = {
        username: $("#username").val(),
        position : $("#position").val(),
        password : $("#password").val(),
        confirm_password : $("#confirm_password").val(),
        // profile_pic : $("#profile_pic").val(),
	}

    $.ajax({
        "url" : USERS_API ,
        "type" : "POST",
        "data" : "update=" + JSON.stringify(userFormUpdate) + "&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            index();
            
            return false;
        }
    })
}

/** End Actual Functions */

// getProfilePic()

// function getProfilePic()
// {
//     $.ajax({
//         "url" : USERS_API,
//         "type" : "GET",
//         "data" : "getProfilePic",
//         "success" : function(response) {
//             let responseJSON = JSON.parse(response)

//             $("#profile_pic").attr("src", "../../api/" + responseJSON.records[0].profile_pic);

//             return false;
//         }
//     })
// }

// function uploadImage() 
// {
//     // $.blockUI();
//     let image = new FormData();
//     image.append("image_file", $("#file")[0].files[0])
//     image.append("data", "your value");

//      $.ajax({
//         "url" : IMAGE_UPLOADER_API ,
//         "type" : "POST",
//         "data" : image,
//         "enctype" : "multipart/form-data",
//         "cache" : false,
//         "contentType" : false,
//         "processData" : false,
//         "success" : function(response) {
//             // $.unblockUI();

//             let responseJSON = JSON.parse(response)

//             alert(responseJSON.description);

//             // getProfilePic();
            
//             return false;
//         }
//     })
// }
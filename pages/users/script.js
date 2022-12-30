//! Used USERS_API_ to avoid conflict on imported dashboard script
//! Imported script from dashboard to use the function getAuthenticatedUser()
const USERS_API_ = "../../api/users.php";


//! Get all information
index();
function index()
{
    $.ajax({
        url: USERS_API_,
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
                    "<td>" + jsonParse.records[i].profile_pic + "</td>" + 
                    "<td>" + jsonParse.records[i].timestamp + "</td>" + 

                    "<td><button id='editButton' onclick='goToView(" +jsonParse.records[i].id+ ")'>EDIT</button>&nbsp;"+
                    "<button id='deleteButton' onclick='destroy(" +jsonParse.records[i].id+ ")'>DELETE</button></td>" + 
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
        url: USERS_API_,
        type: "POST",
        data: "show&id=" + id,
        success: function (response) {
            
            let jsonParse = JSON.parse(response)

            $("#firstname").val(jsonParse.records[0].firstname);
            $("#lastname").val(jsonParse.records[0].lastname);
            $("#username").val(jsonParse.records[0].username);
            $("#position").val(jsonParse.records[0].position);
        },
    });
}

//! This is onclick function for index action button
function goToView(id)
{
    window.location.href = 'view.html?id=' + id;
}

//! Saving a record
function store()
{
    let userForm = {
		firstname : $("#firstname").val(),
        lastname : $("#lastname").val(),
        username: $("#username").val(),
        position : $("#position").val(),
        password: $("#password").val(),
        confirm_password : $("#confirm_password").val(),
	}

    $.ajax({
        "url" : USERS_API_ ,
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

//! Delete or destroy a record
function destroy(id)
{

    if (!confirm("Are you sure you want to delete?"))
    {
        return;
    }

    $.ajax({
        "url" : USERS_API_ ,
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

//! Update a record
function update(id)
{
    let userFormUpdate = {
        username : $("#username").val(),
        position : $("#position").val(),
        password : $("#password").val(),
        confirm_password : $("#confirm_password").val(),
	}

    $.ajax({
        "url" : USERS_API_ ,
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

//!----------------------------------
//!For profile picture update

function uploadImage() 
{
    let image = new FormData();
    image.append("image_file", $("#file")[0].files[0])
    image.append("data", "your value");

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

            getProfilePic();
            
            return false;
        }
    })
}
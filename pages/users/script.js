
//@TODO Change api variable api path
const USERS_API = "../../api/users.php";
// const IMAGE_UPLOADER_API = "../../api/uploader.php";

/** Actual Functions */

/**
 * index = get all information
 * show?id = get 1 information only
 * store = saving new data or resource
 * destroy?id = delete a resource
 * update?id new resource = to update new resource
 */

//Get all information
index();
function index()
{
    $.ajax({
        "url" : USERS_API + "?index",
        "success" : function(response) {
            
            let jsonParse = JSON.parse(response)
            let tr = '';

            for (var i = 0; i<jsonParse.records.length; i++) 
            {
                //@TODO Change display iterations
                //jsonParse.records[i].id
                tr += "<tr>" +
                    "<td>" + jsonParse.records[i].firstname + "</td>" + 
                    "<td>" + jsonParse.records[i].lastname + "</td>" + 
                    "<td>" + jsonParse.records[i].username + "</td>" + 
                    "<td>" + jsonParse.records[i].password + "</td>" + 
                    // "<td>" + jsonParse.records[i].profile_pic + "</td>" + 
                    "<td>" + jsonParse.records[i].timestamp + "</td>" + 

                    "<td><button onclick='goToView(" +jsonParse.records[i].id+ ")'>EDIT</button>&nbsp;"+
                    "<button onclick='destroy(" +jsonParse.records[i].id+ ")'>DELETE</button></td>" + 
                "</tr>";
            }

            /**
             * Change element to be display
             */
            $("#records").html(tr)
        }
    })
}

function goToView(id)
{
    window.location.href = 'view.html?id=' + id;
}

/**
 * 
 * @param {*} id 
 */
function show(id)
{
    //@var change variable ITEMS_API
    $.ajax({
        "url" : USERS_API + "?show&id=" + id,
        "success" : function(response) {
            
            let jsonParse = JSON.parse(response)

            //@TODO 
            //@var change element design if needed
            $("#firstname").val(jsonParse.records.firstname);
            $("#lastname").val(jsonParse.records.lastname);
            $("#username").val(jsonParse.records.username);
            $("#password").val(jsonParse.records.password);
        }
    })
}

//Saving a record
function store()
{

    /**
     * Change json collections
     */
    //@TODO change json collection
    let userForm = {
		firstname : $("#firstname").val(),
        lastname : $("#lastname").val(),
        username : $("#username").val(),
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
        username : $("#username").val(),
        password : $("#password").val(),
        confirm_password : $("#confirm_password").val(),
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
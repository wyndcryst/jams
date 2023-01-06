//! Used USERS_API_ to avoid conflict on imported dashboard script
//! Imported script from dashboard to use the function getAuthenticatedUser()
const USERS_API_ = "../../api/users.php";

let serviceDataTable;

//! Get all information
index();
function index()
{
  // destroy the old table if it exists
  if (serviceDataTable) {
    serviceDataTable.destroy();
  }

  // initialize the new table
  serviceDataTable = $("#records").DataTable({
    processing : true,
    responsive: true,
    ajax: {
      url: USERS_API_ + "?index",
      dataSrc: function (response) {
        var return_data = new Array();

        for (let i = 0; i<response.records.length; i++) {

          return_data.push
          ({
            firstname : response.records[i].firstname,
            lastname :  response.records[i].lastname,
            username :  response.records[i].username,
            position : response.records[i].position,
            password : response.records[i].password,
            profile_pic : response.records[i].profile_pic,
            timestamp : response.records[i].timestamp,
            action : "<button id='editButton' onclick='goToView(" +response.records[i].id+ ")'>EDIT</button>&nbsp;"+"<button id='deleteButton' onclick='destroy(" +response.records[i].id+ ")'>DELETE</button>"
          });

        }
        return return_data;

      },

    },
    columns: [

      { data : 'firstname' },
      { data : 'lastname' },
      { data : 'username' },
      { data : 'position' },
      { data : 'password' },
      { data : 'profile_pic' },
      { data : 'timestamp' },
      { data : 'action' },
      ],
      
  });
}

/* 
* This is without DataTable.
* note that corresponding API should be changed to $_POST method
*/
// function index()
// {
//     $.ajax({
//         url: USERS_API_,
//         type: "POST",
//         data: "index",
//         success: function(response) {
            
//             let jsonParse = JSON.parse(response)
//             let tr = '';

//             for (var i = 0; i<jsonParse.records.length; i++) 
//             {
//                 tr += "<tr>" +
//                     "<td>" + jsonParse.records[i].firstname + "</td>" + 
//                     "<td>" + jsonParse.records[i].lastname + "</td>" + 
//                     "<td>" + jsonParse.records[i].username + "</td>" + 
//                     "<td>" + jsonParse.records[i].position + "</td>" + 
//                     "<td>" + jsonParse.records[i].password + "</td>" + 
//                     "<td>" + jsonParse.records[i].profile_pic + "</td>" + 
//                     "<td>" + jsonParse.records[i].timestamp + "</td>" + 

//                     "<td id='actionButtons'><button id='editButton' onclick='goToView(" +jsonParse.records[i].id+ ")'>EDIT</button>&nbsp;"+
//                     "<button id='deleteButton' onclick='destroy(" +jsonParse.records[i].id+ ")'>DELETE</button></td>" + 
//                 "</tr>";
//             }
            
//             $("#records").html(tr)
//         }
//     })
// }


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
        "success": function (response)
        {

            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            index();


            
            return false;
        }
    })

    // Clear input fields
    $("#firstname").val("");
    $("#lastname").val("");
    $("#username").val("");
    $("#position").val("");
    $("#password").val("");
    $("#confirm_password").val("");

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
    image.append("data", id);

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
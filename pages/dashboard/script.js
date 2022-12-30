const DASHBOARD_API = "../../api/dashboard.php";
const USERS_API =  "../../api/users.php";
// const IMAGE_UPLOADER_API = "../../api/uploader.php";

getAuthenticatedUser()
// getProfilePic()

function getAuthenticatedUser() {
    $.ajax({
        url: DASHBOARD_API,
        type: "POST",
        data: "getAuthUser",
        "success" : function(response) {
            let responseJSON = JSON.parse(response);

            if (responseJSON.code == 200)
            {
                $("#firstName").text(responseJSON.details.firstname)
                $("#firstNameDashboard").text(responseJSON.details.firstname)
                // Used in users page navbar
                $("#firstNameUsersNav").text(responseJSON.details.firstname)
                // Used in user-details page navbar
                $("#firstNameUserNav").text(responseJSON.details.firstname)

            } else {
                window.location.href = "../../"
            }
        }
    })
}


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
const CUSTOMERS_API = "../../api/customers.php";
const AREA_LOCATION_API = "../../api/areaLocation.php";

// Read from the area_location table in jams DB
// Connect with AREA_LOCATION_API
// This is options for select #town_city
getTownCity()
let provinces = []
let cities = []
function getTownCity() {

    $.ajax({
        url: AREA_LOCATION_API,
        type: "POST",
        data: "getLocations",
        success: function (response) {

            let jsonParse = JSON.parse(response)
            let options = "";

            for (var i = 0; i < jsonParse.records.length; i++) {
                cities[jsonParse.records[i].town_city] = jsonParse.records[i].province;
                options += "<option value='" + jsonParse.records[i].town_city + "' data='" +jsonParse.records[i].province+ "'>" + jsonParse.records[i].town_city + "</option>";
            }

            $("#town_city").html(options);
        },
    });
}


function setProvince() {
    $("#province").val(cities[$("#town_city").val()]);
}



//! Get all information
index();
function index()
{
    $.ajax({
        url: CUSTOMERS_API,
        type: "POST",
        data: "index",
        success: function (response)
        {
            let jsonParse = JSON.parse(response)
            let tr = '';

            for (var i = 0; i<jsonParse.records.length; i++) 
            {
                tr += "<tr>" +
                "<td>" + jsonParse.records[i].customer + "</td>" +
                "<td>" + jsonParse.records[i].address + "</td>" +
                "<td>" + jsonParse.records[i].circuit_id + "</td>" +
                "<td>" + jsonParse.records[i].work_order + "</td>" +
                "<td>" + jsonParse.records[i].bandwidth + "</td>" +
                "<td>" + jsonParse.records[i].service_type + "</td>" +
                "<td>" + jsonParse.records[i].last_mile_type + "</td>" +
                "<td>" + jsonParse.records[i].medium_assignments + "</td>" +
                "<td>" + jsonParse.records[i].terminating_node_ne_name + "</td>" +
                "<td>" + jsonParse.records[i].homing_pla_id + "</td>" +
                "<td>" + jsonParse.records[i].homing_site_name + "</td>" +
                "<td>" + jsonParse.records[i].port_assignment + "</td>" +
                "<td>" + jsonParse.records[i].town_city + "</td>" +
                "<td>" + jsonParse.records[i].province + "</td>" +
                "<td>" + jsonParse.records[i].status + "</td>" +

                "<td id='actionButtons'><button id='editButton' onclick='goToView(" +jsonParse.records[i].id+ ")'>EDIT</button>&nbsp;"+
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
        url: CUSTOMERS_API,
        type: "POST",
        data: "show&id=" + id,
        success: function (response) {
            
            let jsonParse = JSON.parse(response)

            $("#customer").val(jsonParse.records[0].customer);
            $("#address").val(jsonParse.records[0].address);
            $("#circuit_id").val(jsonParse.records[0].circuit_id);
            $("#work_order").val(jsonParse.records[0].work_order);
            $("#bandwidth").val(jsonParse.records[0].bandwidth);
            $("#service_type").val(jsonParse.records[0].service_type);
            $("#last_mile_type").val(jsonParse.records[0].last_mile_type);
            $("#medium_assignments").val(jsonParse.records[0].medium_assignments);
            $("#terminating_node_ne_name").val(jsonParse.records[0].terminating_node_ne_name);
            $("#homing_pla_id").val(jsonParse.records[0].homing_pla_id);
            $("#homing_site_name").val(jsonParse.records[0].homing_site_name);
            $("#port_assignment").val(jsonParse.records[0].port_assignment);
            $("#town_city").val(jsonParse.records[0].town_city);
            $("#province").val(jsonParse.records[0].province);
            $("#status").val(jsonParse.records[0].status);
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
    let customerForm = {
		customer : $("#customer").val(),
        address : $("#address").val(),
        circuit_id: $("#circuit_id").val(),
        work_order : $("#work_order").val(),
        bandwidth: $("#bandwidth").val(),
        service_type : $("#service_type").val(),
        last_mile_type : $("#last_mile_type").val(),
        medium_assignments : $("#medium_assignments").val(),
        terminating_node_ne_name : $("#terminating_node_ne_name").val(),
        homing_pla_id : $("#homing_pla_id").val(),
        homing_site_name : $("#homing_site_name").val(),
        port_assignment : $("#port_assignment").val(),
        town_city : $("#town_city").val(),
        province : $("#province").val(),
        status : $("#status").val(),
	}

    $.ajax({
        "url" : CUSTOMERS_API ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(customerForm),
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
        "url" : CUSTOMERS_API ,
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
    let customerFormUpdate = {
		customer : $("#customer").val(),
        address : $("#address").val(),
        circuit_id: $("#circuit_id").val(),
        work_order : $("#work_order").val(),
        bandwidth: $("#bandwidth").val(),
        service_type : $("#service_type").val(),
        last_mile_type : $("#last_mile_type").val(),
        medium_assignments : $("#medium_assignments").val(),
        terminating_node_ne_name : $("#terminating_node_ne_name").val(),
        homing_pla_id : $("#homing_pla_id").val(),
        homing_site_name : $("#homing_site_name").val(),
        port_assignment : $("#port_assignment").val(),
        town_city : $("#town_city").val(),
        province : $("#province").val(),
        status : $("#status").val(),
	}

    $.ajax({
        "url" : CUSTOMERS_API ,
        "type" : "POST",
        "data" : "update=" + JSON.stringify(customerFormUpdate) + "&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            index();
            
            return false;
        }
    })
}
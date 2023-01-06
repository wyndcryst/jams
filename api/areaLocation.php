<?php

include_once("config.php");
include_once("constants.php");

if (isset($_POST['getLocations'])) 
{
    $sqlCommand = "SELECT * FROM `area_location`;";

    $results = $connection->query($sqlCommand);

    $response = array();
    
    $records = array();

    while ($row = $results->fetch_assoc()) 
    {
        array_push($records, $row);
    }

    $response["code"] = SUCCESS;
    $response["total_rows"] = $results->num_rows;
    $response["records"] = $records;
    
    echo json_encode($response);
}

?>
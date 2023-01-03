<?php

include_once("config.php");
include_once("constants.php");

//@TODO Change table name 
define("TABLE_NAME", "customers");

/**
 * This code is for selecting all information
 */
if (isset($_POST['index'])) 
{
    //@TODO conditions to display all
    $sqlCommand = "SELECT * FROM " . TABLE_NAME;

    $results = $connection->query($sqlCommand);

    $response = array();

    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $response["code"] = SUCCESS;
    $response["total_rows"] = $results->num_rows;
    $response["records"] = $records;

    echo json_encode($response);
}

/**
 * This code is for selecting one information only
 */
if (isset($_POST['show'])) 
{
    $id = $_POST['id'];

    //@TODO conditions to display a specific
    $sqlCommand = "SELECT * FROM " . TABLE_NAME . " WHERE id = $id";

    $results = $connection->query($sqlCommand);

    $response = array();

    $records = array();

    while ($row = $results->fetch_assoc()) {
        array_push($records, $row);
    }

    $response["code"] = SUCCESS;
    $response["total_rows"] = $results->num_rows;
    $response["records"] = $records;

    echo json_encode($response);
}

/**
 * This code is for creating new resource
 */
if (isset($_POST['store'])) 
{
    $response = array();

    $data = json_decode($_POST['store']);

    $sqlCommand = "
    INSERT INTO " . TABLE_NAME . "
        (
            `customer`, 
            `address`, 
            `circuit_id`, 
            `work_order`, 
            `bandwidth`, 
            `service_type`, 
            `last_mile_type`, 
            `medium_assignments`, 
            `terminating_node_ne_name`, 
            `homing_pla_id`, 
            `homing_site_name`, 
            `port_assignment`, 
            `town_city`, 
            `province`, 
            `status`
        ) 
    VALUES 
        (
            '{$data->customer}',
            '{$data->address}',
            '{$data->circuit_id}',
            '{$data->work_order}',
            '{$data->bandwidth}',
            '{$data->service_type}',
            '{$data->last_mile_type}',
            '{$data->medium_assignments}',
            '{$data->terminating_node_ne_name}',
            '{$data->homing_pla_id}',
            '{$data->homing_site_name}',
            '{$data->port_assignment}',
            '{$data->town_city}',
            '{$data->province}',
            '{$data->status}'
        )
    ";

    $isInserted = $connection->query($sqlCommand);

    if ($isInserted) {
        $response["code"] = SUCCESS;
        $response["description"] = "Successfully saved new customer.";
    } else {
        $response["code"] = SERVER_ERROR;
        $response["description"] = "Error while saving";
    }

    echo json_encode($response);
}

/**
 *  For Deleting
 */
if (isset($_POST['destroy'])) {
    $id = $_POST['id'];

    $sqlCommand = "
    DELETE FROM " . TABLE_NAME . "
    WHERE id = $id
    ";

    $isInserted = $connection->query($sqlCommand);

    $response = array();

    if ($isInserted) {
        $response["code"] = SUCCESS;
        $response["description"] = "Successfully delete customer";
    } else {
        $response["code"] = SERVER_ERROR;
        $response["description"] = "Error while deleting customer";
    }

    echo json_encode($response);
}

/**
 * For Update
 */
if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $data = json_decode($_POST['update']);

    $sqlCommand = "
    UPDATE " . TABLE_NAME . "
    SET `customer`='{$data->customer}',
    `address`='{$data->address}',
    `circuit_id`='{$data->circuit_id}',
    `work_order`='{$data->work_order}',
    `bandwidth`='{$data->bandwidth}',
    `service_type`='{$data->service_type}',
    `last_mile_type`='{$data->last_mile_type}',
    `medium_assignments`='{$data->medium_assignments}',
    `terminating_node_ne_name`='{$data->terminating_node_ne_name}',
    `homing_pla_id`='{$data->homing_pla_id}',
    `homing_site_name`='{$data->homing_site_name}',
    `port_assignment`='{$data->port_assignment}',
    `town_city`='{$data->town_city}',
    `province`='{$data->province}',
    `status`='{$data->status}'
    WHERE id = $id
    ";

    $isInserted = $connection->query($sqlCommand);

    $response = array();

    if ($isInserted) {
        $response["code"] = SUCCESS;
        $response["description"] = "Successfully Updated user";
    } else {
        $response["code"] = SERVER_ERROR;
        $response["description"] = "Error while updating users";
    }

    echo json_encode($response);
}
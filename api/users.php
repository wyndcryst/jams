<?php

include_once ("config.php");
include_once ("constants.php");

//@TODO Change table name 
define("TABLE_NAME", "users");

/**
 * This code is for selecting all informations 
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

    if ($data->password !== $data->confirm_password)
    {
        $response["code"] = INPUT_ERROR;
        $response["description"] = "Password doesn't match";

        echo json_encode($response);
        return;
    }

    $password = password_hash($data->password, PASSWORD_DEFAULT);

    //TODO : Add profile_pic after password
    $sqlCommand = "
    INSERT INTO " .TABLE_NAME. "
        (
            `firstname`, 
            `lastname`, 
            `username`, 
            `position`, 
            `password`
        ) 
    VALUES 
        (
            '{$data->firstname}',
            '{$data->lastname}',
            '{$data->username}',
            '{$data->position}',
            '{$password}'
        )
    ";

    $isInserted = $connection->query($sqlCommand);

    if ($isInserted)
    {
        $response["code"] = SUCCESS;
        $response["description"] = "Successfully saved new user.";
    } else 
    {
        $response["code"] = SERVER_ERROR; 
        $response["description"] = "Error while saving";
    }

    echo json_encode($response);
}

/**
 *  For Deleting
 */
if (isset($_POST['destroy']))
{
    $id = $_POST['id'];

    $sqlCommand = "
    DELETE FROM " . TABLE_NAME. "
    WHERE id = $id
    ";

    $isInserted = $connection->query($sqlCommand);

    $response = array();

    if ($isInserted)
    {
        $response["code"] = SUCCESS;
        $response["description"] = "Successfully Delete Employee";
    } else 
    {
        $response["code"] = SERVER_ERROR; 
        $response["description"] = "Error while deleting employee";
    }

    echo json_encode($response);

}

/**
 * For Update
 */
 if (isset($_POST['update']))
 {
    $id = $_POST['id'];
    $data = json_decode($_POST['update']);

    if ($data->password !== $data->confirm_password)
    {
        $response["code"] = INPUT_ERROR;
        $response["description"] = "Password doesn't match";

        echo json_encode($response);
        return;
    }

    $password = password_hash($data->password, PASSWORD_DEFAULT);

    $sqlCommand = "
    UPDATE " .TABLE_NAME. "
    SET position = '{$data->position}',
    password = '{$password}'
    WHERE id = $id
    ";

    $isInserted = $connection->query($sqlCommand);

    $response = array();

    if ($isInserted)
    {
        $response["code"] = SUCCESS;
        $response["description"] = "Successfully Updated user";
    } else 
    {
        $response["code"] = SERVER_ERROR; 
        $response["description"] = "Error while updating users";
    }

    echo json_encode($response);
 }
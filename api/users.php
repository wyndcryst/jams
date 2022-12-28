<?php

/**
 * This is to load environment
 */
include_once ("config.php");
include_once ("constants.php");

//@TODO Change table name 
define("TABLE_NAME", "users");

/**
 * This code is for selecting all informations 
 */
if (isset($_GET['index']))
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
if (isset($_GET['show']))
{
   $id = $_GET['id'];
   
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

    //@TODO conditions before saving
    //@TODO change columns and values
    $sqlCommand = "
    INSERT INTO " .TABLE_NAME. "
        (
            `firstname`, 
            `lastname`, 
            `username`, 
            `password`
        ) 
    VALUES 
        (
            '{$data->firstname}',
            '{$data->lastname}',
            '{$data->username}',
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

    //@TODO Add condition before updating
    //@TODO Change all columns and values before updatnig
    $sqlCommand = "
    UPDATE " .TABLE_NAME. "
    SET `username`='{$data->username}',
    password = '{$data->password}',
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



//  if (isset($_GET['getProfilePic']))
//  {
//     $username = $_SESSION['loggedin-user'];

//     $sqlCommand = "SELECT * FROM " . TABLE_NAME . " WHERE username = '$username'";

//     $results = $connection->query($sqlCommand);

//     $response = array();

//     $records = array();

//     while ($row = $results->fetch_assoc()) {
//         array_push($records, $row);
//     }

//     $response["code"] = SUCCESS;
//     $response["total_rows"] = $results->num_rows;
//     $response["records"] = $records;

//     echo json_encode($response);
//  }

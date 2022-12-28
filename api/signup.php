<?php

/**
 * This is to load environment
 */
include_once ("config.php");
include_once ("constants.php");

//@TODO Change table name 
define("TABLE_NAME", "users");

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
        $response["description"] = "Password doesn't match, please try again.";

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
        $response["description"] = "Successfully signed-in. Please go to Login page or click Already signed up below.";
    } else 
    {
        $response["code"] = SERVER_ERROR; 
        $response["description"] = "Error while signing-in";
    }

    echo json_encode($response);
}

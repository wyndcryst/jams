<?php

include_once ("config.php");
include_once ("constants.php");

define("TABLE_NAME", "users");

/**
 *! This code is for creating new resource
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

    if ($data->password == strlen($data->password) < 8) 
    {
        $response["code"] = INPUT_ERROR;
        $response["description"] = "Password must be at least 8 characters.";

        echo json_encode($response);
        return;
    }

    if ($data->password == ! preg_match("/[a-z]/i", $data->password)) 
    {
        $response["code"] = INPUT_ERROR;
        $response["description"] = "Password must contain at least one letter.";

        echo json_encode($response);
        return;
    }

    if ($data->password == ! preg_match("/[0-9]/i", $data->password)) 
    {
        $response["code"] = INPUT_ERROR;
        $response["description"] = "Password must contain at least one number.";

        echo json_encode($response);
        return;
    }

    $password = password_hash($data->password, PASSWORD_DEFAULT);

    $sqlCommand = "
    INSERT INTO " .TABLE_NAME. "
        (
            `firstname`, 
            `lastname`, 
            `username`, 
            `position`, 
            `password`,
            `profile_pic`
        ) 
    VALUES 
        (
            '{$data->firstname}',
            '{$data->lastname}',
            '{$data->username}',
            '{$data->position}',
            '{$password}',
            '{$_SESSION["file-path"]}'
        )
    ";

    $isInserted = $connection->query($sqlCommand);

    if ($isInserted)
    {
        $response["code"] = SUCCESS;
        $response["description"] = "Successfully signed-in.";
    } else 
    {
        $response["code"] = SERVER_ERROR; 
        $response["description"] = "Error while signing-in";
    }

    echo json_encode($response);
}

?>
<?php

include_once ("config.php");
include_once ("constants.php");

$path = "";
$hasError = false;
foreach ($_FILES as $key) 
{
    $name = $key["name"];
    $path = "../images/$name";

    @move_uploaded_file($key["tmp_name"], $path);
    $_SESSION["file-path"] = $path;
}

if ($hasError)
{
    $response["code"] = SERVER_ERROR;
    $response["description"] = "Max File Reached";
    echo json_encode($response);
    return;
}

$response["code"] = SUCCESS;
$response["description"] = "Successfully updated profile picture.";

echo json_encode($response);

?>
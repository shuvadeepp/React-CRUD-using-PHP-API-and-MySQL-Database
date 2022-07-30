<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include ("DBConnect.php"); 

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id)
    && isset($data->name)
    && isset($data->email)
    && isset($data->mobile)
    && is_numeric($data->id)
    && !empty(trim($data->name))
    && !empty(trim($data->email))
    && !empty(trim($data->mobile))
) {
    $username = mysqli_real_escape_string($db_conn, trim($data->name));
    $useremail = mysqli_real_escape_string($db_conn, trim($data->email));
    $usermobile = mysqli_real_escape_string($db_conn, trim($data->mobile));
    
    if (filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        $updateUser = mysqli_query($db_conn, "UPDATE `users` SET `name`='$username', `email`='$useremail', `mobile`= $usermobile WHERE `id`='$data->id'");
        //print_r($updateUser);exit;
        if ($updateUser) {
            echo json_encode(["success" => 1, "msg" => "Record Updated successfully."]);
        } else {
            echo json_encode(["success" => 0, "msg" => "Record Not Updated!"]);
        }
    } else {
        echo json_encode(["success" => 0, "msg" => "Invalid Email Address!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
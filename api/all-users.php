<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$input_files = json_decode(file_get_contents('php://input'),true);
//print_r($input_files);exit;
include ("DBConnect.php"); 

//print_r($input_files);exit;
//echo json_encode(["success" => 1, "users" => $input_files], true);exit;
$allUsers = mysqli_query($db_conn, "SELECT * FROM users WHERE id = ".$input_files['id']);
// print_r($allUsers);exit;
if (mysqli_num_rows($allUsers) > 0) {
    $all_users = mysqli_fetch_all($allUsers, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "users" => $all_users], true);
} else {
    echo json_encode(["success" => 0]);
}
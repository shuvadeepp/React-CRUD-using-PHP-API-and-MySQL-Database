<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include ("DBConnect.php"); 

$data = json_decode(file_get_contents("php://input"), TRUE);

    if ( isset($data->id) ) {
        $DeleteQuery = "DELETE FROM crud_tab WHERE `id`='$data->id'";
        if ($DeleteQuery) {
            echo json_encode(["success" => 1, "msg" => "Record Deleted successfully."]);
        } else {
            echo json_encode(["success" => 0, "msg" => "Record Not  Deleted!"]);
        }
    }
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$input_files = (json_decode(file_get_contents('php://input'),true))?json_decode(file_get_contents('php://input'),true):array();
//print_r($input_files);exit;
include ("DBConnect.php"); 

//print_r($input_files);exit;
//echo json_encode(["success" => 1, "users" => $input_files], true);exit;
    if(array_key_exists('id',$input_files) && !empty($input_files['id'])){
        $concatQuery = ' AND id = '.$input_files['id'];
    }else{
        $concatQuery = '';
    }

        if ($_GET['offset']) {
            $offset = $_GET['offset'];
        } else {
            $offset = 0;
        }
        
$allUsers = mysqli_query($db_conn, "SELECT * FROM users WHERE 1=1 ".$concatQuery . " LIMIT ".$offset. ", 2" );

$totalRec = mysqli_query($db_conn, "SELECT COUNT(1) as totalrec FROM users " );
 
$totalRec = mysqli_fetch_all($totalRec, MYSQLI_ASSOC);
 //print_r($totalRec);exit;
if (mysqli_num_rows($allUsers) > 0) {
    $all_users = mysqli_fetch_all($allUsers, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "users" => $all_users, "totalRec" => $totalRec[0]['totalrec']], true);exit;
} else {
    echo json_encode(["success" => 0]);exit;
}
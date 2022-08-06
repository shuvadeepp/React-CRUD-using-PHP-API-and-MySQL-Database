<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include ("DBConnect.php"); 

$data = (json_decode(file_get_contents('php://input')))?json_decode(file_get_contents('php://input')):(object)$_REQUEST;



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
    $oldFile = mysqli_real_escape_string($db_conn, trim($data->oldFile));
    $fileUpload = $oldFile;
    if(!empty($_FILES)){
        $file = $_FILES['fileUpload']['name'];
        $temp = $_FILES['fileUpload']['tmp_name'];
        $pathinfo = pathinfo($file, PATHINFO_FILENAME);
        $pathexe = pathinfo($file, PATHINFO_EXTENSION);
        $fileUpload = $pathinfo."".date("Ymd").".".$pathexe;
        move_uploaded_file($temp,"img/" . $fileUpload);
        if(!empty($oldFile) && file_exists('img/'.$oldFile)){
            unlink('img/'.$oldFile);
        }
    }
    //echo "UPDATE `users` SET `name`='$username', `email`='$useremail', `mobile`= $usermobile, `fileUpload`= $fileUpload WHERE `id`='$data->id'";exit;
    if (filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        $updateUser = mysqli_query($db_conn, "UPDATE `users` SET `name`='$username', `email`='$useremail', `mobile`= $usermobile, `fileUpload`= '$fileUpload' WHERE `id`='$data->id'");
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
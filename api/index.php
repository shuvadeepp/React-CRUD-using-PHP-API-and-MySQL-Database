<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
// echo "testing...";

$input_files = json_decode(file_get_contents('php://input'));



include ("DBConnect.php"); 

// echo $conn;

$objDb = new DbConnect();
// var_dump($objDb);
// echo"<pre>";print_r($objDb);exit;

if (isset($input_files->name)) {
	$name 		    = $input_files->name;
	$email 		    = $input_files->email;
	$mobile 	    = $input_files->mobile;

	$insert_qry     = $conn_obj->insert('users',
    [
		'name'	    =>$name, 
		'email'	    =>$email, 
		'mobile'	=>$mobile,
	]);

    if ($insert_qry = true) {
        $response   = ['status' => 1, 'message' => 'Record Added successfully'];
    }else{
        $response   = ['status' => 0, 'message' => 'Failed to create record'];
    }
    echo json_encode($response, true);

}



?>
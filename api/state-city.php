<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$data   = json_decode(file_get_contents('php://input'),true);
$method = $data['method'];


$readJson = file_get_contents('state-city.json');
//print_r($readJson);
$readJson  = json_decode($readJson,true);
//print_r($readJson);exit;
$countries = array_column($readJson['countries'], 'country');
//print_r($countries);exit;
switch($method){
    case "getallcountry":
        echo json_encode(array('status' => 200, 'result' => $countries));exit;
    break;

    case "getallstates":
        $country       = $data['country'];
        //print_r(array_map($country, $readJson['countries']));exit;
        $getcountryKey = array_search($country, array_column($readJson['countries'], 'country'));
        $getStates     = $readJson['countries'][$getcountryKey]['states'];
        echo json_encode(array('status' => 200, 'result' => $getStates));exit;
    break;
}



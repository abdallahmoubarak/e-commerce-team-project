<?php

include("../../connection.php");



$query = $mysqli->prepare("SELECT * FROM ads WHERE id = ?");
$query->bind_param('i', $picture_url);
$query->execute();

$array = $query->get_result();

$response = [];

while($value = $array->fetch_assoc()){
    $response[] = $value;
};

if($response){
    echo json_encode($response); 
}else{
    echo "error";
}
?>

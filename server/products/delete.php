<?php

include("../connection.php");

if($_SERVER["REQUEST_METHOD"] == "POST"){
  $id = $_POST["id"];
  

  $sql = "DELETE FROM `products` WHERE `id` = $id";
  $query =$mysqli->prepare($sql);

  
  $query->execute();

  if($query){
      echo "done successfully";

  }else{
      echo "something went wrong";
  }
}

?>
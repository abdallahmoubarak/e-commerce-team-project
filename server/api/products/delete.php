<?php

include("../../connection.php");

if($_SERVER["REQUEST_METHOD"] == "POST"){

  $id = $_POST["id"];
  
  $query =$mysqli->prepare("DELETE FROM products WHERE id = ?");
  $query->bind_param('i', $id);
  $array = $query->get_result();

  $query->execute();

  if($query){
      echo "done successfully";

  }else{
      echo "something went wrong";
  }
}

?>

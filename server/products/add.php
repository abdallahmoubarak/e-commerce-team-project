<?php

include("../connection.php");

$id = isset($_POST["id"]);
$name = isset($_POST["name"]);
$description = isset($_POST["description"]);
$price =isset($_POST["price"]);
$discount_price = isset($_POST["discount_price"]);
$picture_img = isset($_POST["picture_img"]);


$query = "INSERT INTO products(id, name,description,price,discount_price,picture_img) VALUE (?,?,?,?,?,?)";
$query = $mysqli->prepare($query);
$query->bind_param("ssssss", $id, $name,$description,$price,$discount_price,$picture_img);
$query->execute();


if($query)
{
  echo "done successfully!";

}
else
{
  echo "Something went wrong!";
}

?>
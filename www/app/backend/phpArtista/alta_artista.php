<?php
include_once("../config.php");

$conexion = obtenerConexion();

$artista = json_decode($_POST['artista']);
$sql = "INSERT INTO artists VALUES (null,'$artista->nombre','$artista->genero','$artista->nacionalidad','$artista->album','$artista->premio','$artista->biografia');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, false, "Se ha insertado el artista correctamente", $conexion);
}

<?php
include_once("../config.php");

$conexion = obtenerConexion();

$cancion = json_decode($_POST['cancion']);

$sql = "INSERT INTO songs VALUES (null, '$cancion->nombre', '$cancion->duracion', '$cancion->lanzamiento', '$cancion->album', '$cancion->letra', '$cancion->url', $cancion->artistaId);";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, false, "Se ha insertado la cancion correctamente", $conexion);
}

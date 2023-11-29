<?php
require_once('../config.php');

$conexion = obtenerConexion();

$idArtista = $_GET['idArtista'];
$sql = "DELETE FROM artists WHERE artist_id = $idArtista;";
$resultado = mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, false, "Datos eliminados", $conexion);
}
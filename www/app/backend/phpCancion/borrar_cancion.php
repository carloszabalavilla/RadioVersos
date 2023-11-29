<?php
require_once('../config.php');
$conexion = obtenerConexion();

$idCancion = $_GET['idCancion'];

$sql = "DELETE FROM songs WHERE song_id = $idCancion;";

$resultado = mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, false, "Datos eliminados", $conexion);
}


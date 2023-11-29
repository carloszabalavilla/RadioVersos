<?php
require_once('../config.php');

$conexion = obtenerConexion();

$idArtista = $_GET['idArtista'];
$sql = "SELECT * FROM songs WHERE artist_id = $idArtista ;";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder($datos, false, "Datos recuperados", $conexion);
}

<?php
require_once('../config.php');

$conexion = obtenerConexion();

$idartista = $_GET['idartista'];
$sql = "SELECT * FROM artists WHERE artist_id = '$idartista';";
$resultado = mysqli_query($conexion, $sql);

$fila = mysqli_fetch_assoc($resultado);

if ($fila) {
    responder($fila, false, "Datos recuperados", $conexion);
} else {
    responder(null, true, "No existe el artista", $conexion);
}

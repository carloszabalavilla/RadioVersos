<?php
require_once('../config.php');

$conexion = obtenerConexion();

$idCancion = $_GET['idCancion'];
$sql = "SELECT * FROM songs WHERE song_id = $idCancion;";

$resultado = mysqli_query($conexion, $sql);

$fila = mysqli_fetch_assoc($resultado);

if ($fila) {
    responder($fila, false, "Datos recuperados", $conexion);
} else {
    responder(null, true, "No existe la cancion", $conexion);
}

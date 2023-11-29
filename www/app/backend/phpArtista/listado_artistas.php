<?php
require_once('../config.php');

$conexion = obtenerConexion();

$sql = "SELECT * FROM artists;";
$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

responder($datos, false, "Datos recuperados", $conexion);

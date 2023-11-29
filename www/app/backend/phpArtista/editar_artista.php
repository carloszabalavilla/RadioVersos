<?php
include_once("../config.php");

$conexion = obtenerConexion();

$artista = json_decode($_POST['artista']);
$sql = "UPDATE artists SET artist_name = '$artista->nombre', genre = '$artista->genero', nationality = '$artista->nacionalidad', album = '$artista->album', award = '$artista->premio', biography = '$artista->biografia' WHERE artist_id = $artista->id;";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, false, "Se ha actualizado el artista correctamente", $conexion);
}

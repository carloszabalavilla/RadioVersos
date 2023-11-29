<?php
include_once("../config.php");

$conexion = obtenerConexion();

$cancion = json_decode($_POST['cancion']);
$sql = "UPDATE songs SET song_title = '$cancion->nombre', duration = '$cancion->duracion', release_year = '$cancion->lanzamiento', album = '$cancion->album', lyrics = '$cancion->letra', videoUrl = '$cancion->url', artist_id = '$cancion->artistaId' WHERE song_id = '$cancion->id'";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, false, "Se ha actualizado la cancion correctamente", $conexion);
}

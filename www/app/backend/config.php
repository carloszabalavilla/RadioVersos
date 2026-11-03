<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
set_exception_handler(function (Throwable $error): void {
    http_response_code($error instanceof InvalidArgumentException ? 400 : 500);
    echo json_encode(['error' => true, 'datos' => null,
        'mensaje' => $error instanceof InvalidArgumentException ? $error->getMessage() : 'No se pudo completar la operación. Comprueba los datos y la conexión local.'], JSON_UNESCAPED_UNICODE);
});
function obtenerConexion(): mysqli {
    $con = new mysqli(getenv('DB_HOST') ?: '127.0.0.1', getenv('DB_USERNAME') ?: '', getenv('DB_PASSWORD') ?: '', getenv('DB_NAME') ?: 'catalogo', (int)(getenv('DB_PORT') ?: 3306));
    $con->set_charset('utf8mb4');
    return $con;
}
function responder($datos, bool $error, string $mensaje, mysqli $conexion): never {
    echo json_encode(['error' => $error, 'datos' => $datos, 'mensaje' => $mensaje], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    $conexion->close();
    exit;
}
function catalogo(string $tipo, string $accion): void {
    $con = obtenerConexion();
    $artista = $tipo === 'artista';
    $tabla = $artista ? 'artists' : 'songs';
    $clave = $artista ? 'artist_id' : 'song_id';
    $campos = $artista ? ['nombre'=>'artist_name','genero'=>'genre','nacionalidad'=>'nationality','album'=>'album','premio'=>'award','biografia'=>'biography']
        : ['nombre'=>'song_title','duracion'=>'duration','lanzamiento'=>'release_year','album'=>'album','letra'=>'lyric','url'=>'videoUrl','artistaId'=>'artist_id'];
    if ($accion === 'listar') {
        $filas = $con->execute_query("SELECT * FROM $tabla ORDER BY $clave")->fetch_all(MYSQLI_ASSOC);
        responder($filas, false, 'Datos recuperados', $con);
    }
    $id = filter_var($_GET['idArtista'] ?? $_GET['idartista'] ?? $_GET['idCancion'] ?? null, FILTER_VALIDATE_INT);
    if (in_array($accion, ['buscar','borrar','canciones'], true)) {
        if (!$id || $id < 1) throw new InvalidArgumentException('Identificador no válido');
        if ($accion === 'borrar') {
            $con->execute_query("DELETE FROM $tabla WHERE $clave = ?", [$id]);
            responder(null, false, 'Datos eliminados', $con);
        }
        $sql = $accion === 'canciones' ? 'SELECT * FROM songs WHERE artist_id = ? ORDER BY song_id' : "SELECT * FROM $tabla WHERE $clave = ?";
        $result = $con->execute_query($sql, [$id]);
        $datos = $accion === 'canciones' ? $result->fetch_all(MYSQLI_ASSOC) : $result->fetch_assoc();
        responder($datos, $datos === null, $datos === null ? 'No existe el registro' : 'Datos recuperados', $con);
    }
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') throw new InvalidArgumentException('Se requiere POST');
    try { $datos = json_decode($_POST[$tipo] ?? '', true, 512, JSON_THROW_ON_ERROR); }
    catch (JsonException $e) { throw new InvalidArgumentException('Datos JSON no válidos'); }
    if (!is_array($datos)) throw new InvalidArgumentException('Datos no válidos');
    $params = [];
    foreach ($campos as $entrada => $columna) {
        if (!isset($datos[$entrada]) || !is_scalar($datos[$entrada])) throw new InvalidArgumentException('Falta el campo ' . $entrada);
        $params[] = $datos[$entrada];
    }
    if ($accion === 'alta') {
        $columnas = implode(',', array_values($campos));
        $marcas = implode(',', array_fill(0, count($campos), '?'));
        $con->execute_query("INSERT INTO $tabla ($columnas) VALUES ($marcas)", $params);
    } else {
        $id = filter_var($datos['id'] ?? null, FILTER_VALIDATE_INT);
        if (!$id || $id < 1) throw new InvalidArgumentException('Identificador no válido');
        $sets = implode(',', array_map(fn($col) => "$col = ?", array_values($campos)));
        $params[] = $id;
        $con->execute_query("UPDATE $tabla SET $sets WHERE $clave = ?", $params);
    }
    responder(null, false, 'Operación completada', $con);
}

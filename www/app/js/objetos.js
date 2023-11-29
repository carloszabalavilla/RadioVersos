class Artista {
    constructor(id, nombre, genero, nacionalidad, album, premio, biografia) {
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.nacionalidad = nacionalidad;
        this.album = album;
        this.premio = premio;
        this.biografia = biografia;
    }

    async altaArtista(oArtista) {
        let datos = new FormData();

        datos.append("artista", JSON.stringify(oArtista));

        let respuesta = await peticionPOST("phpArtista/alta_artista.php", datos);

        return respuesta;
    }

    async buscarArtista(idArtista) {
        let datos = new FormData();

        datos.append("idartista", idArtista);

        let respuesta = await peticionGET("phpArtista/buscar_artista.php", datos);

        return respuesta;
    }

    async editarArtista(oArtista) {
        let datos = new FormData();

        datos.append("artista", JSON.stringify(oArtista));

        let respuesta = await peticionPOST("phpArtista/editar_artista.php", datos);

        return respuesta;
    }

    async borrarArtista(idArtista) {
        let datos = new FormData();

        datos.append("idArtista", idArtista);

        let respuesta = await peticionGET("phpArtista/borrar_artista.php", datos);

        return respuesta;
    }

    async listadoArtistas() {
        let listado = "";

        let respuesta = await peticionGET("phpArtista/listado_artistas.php", new FormData());

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>ID ARTISTA</th><th>NOMBRE</th><th>GENERO</th><th>NACIONALIDAD</th><th>ALBUM</th><th>PREMIO</th><th>BIOGRAFIA</th></tr></thead><tbody>";

            for (let artista of respuesta.datos) {
                listado += "<tr><td>" + artista.artist_id + "</td>"
                listado += "<td>" + artista.artist_name + "</td>"
                listado += "<td>" + artista.genre + "</td>"
                listado += "<td>" + artista.nationality + "</td>"
                listado += "<td>" + artista.album + "</td>"
                listado += "<td>" + artista.award + "</td>"
                listado += "<td>" + artista.biography + "</td></tr>"
            }
            listado += "</tbody></table>";
        }
        return listado;
    }

    async listadoCancionesArtista(idArtista) {
        let datos = new FormData();

        datos.append("idArtista", idArtista);

        let respuesta = await peticionGET("phpArtista/listado_artistas_canciones.php", datos);

        return respuesta;
    }
}

class Cancion {
    constructor(id, nombre, duracion, lanzamiento, album, letra, url, artistaId) {
        this.id = id;
        this.nombre = nombre;
        this.duracion = duracion;
        this.lanzamiento = lanzamiento;
        this.album = album;
        this.letra = letra;
        this.url = url;
        this.artistaId = artistaId;
    }

    async altaCancion(oCancion) {
        let datos = new FormData();
        console.log(oCancion);
        datos.append("cancion", JSON.stringify(oCancion));

        let respuesta = await peticionPOST("phpCancion/alta_cancion.php", datos);

        return respuesta;
    }

    async buscarCancion(idCancion) {
        let datos = new FormData();

        datos.append("idCancion", idCancion);

        let respuesta = await peticionGET("phpCancion/buscar_cancion.php", datos);

        return respuesta;
    }

    async editarCancion(oCancion) {
        let datos = new FormData();

        datos.append("cancion", JSON.stringify(oCancion));

        let respuesta = await peticionPOST("phpArtista/editar_cancion.php", datos);

        return respuesta;
    }

    async borrarCancion(idCancion) {
        let datos = new FormData();

        datos.append("idCancion", idCancion);

        let respuesta = await peticionGET("phpCancion/borrar_cancion.php", datos);

        return respuesta;
    }

    async listadoCanciones() {
        let listado = "";

        let respuesta = await peticionGET("phpCancion/listado_canciones.php", new FormData());

        if (respuesta.error) {
            listado = respuesta.mensaje;
        } else {
            listado = "<table class='table table-striped'>";
            listado += "<thead><tr><th>ID</th><th>NOMBRE</th><th>DURACION</th><th>AÑO DE LANZAMIENTO</th><th>ALBUM</th><th>LETRA</th><th>VIDEO URL</th><th>ID ARTISTA</th></tr></thead><tbody>";

            for (let cancion of respuesta.datos) {
                listado += "</tr><td>" + cancion.song_id + "</td>"
                listado += "<td>" + cancion.song_title + "</td>"
                listado += "<td>" + cancion.duration + "</td>"
                listado += "<td>" + cancion.release_year + "</td>"
                listado += "<td>" + cancion.album + "</td>"
                listado += "<td>" + cancion.lyric + "</td>"
                listado += "<td>" + cancion.videoUrl + "</td>"
                listado += "<td>" + cancion.artist_id + "</td></tr>"
            }
            listado += "</tbody></table>";
        }
        return listado;
    }
}
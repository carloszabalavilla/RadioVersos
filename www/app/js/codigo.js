"use strict";

var oArtista = new Artista();
var oCancion = new Cancion();

registrarEventos();
mostrarInicio();

function registrarEventos() {
    document
        .querySelector("#mnuBrand")
        .addEventListener("click", mostrarInicio);
    document
        .querySelector("#mnuAltaArtista")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuBuscarArtista")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoArtistas")
        .addEventListener("click", mostrarListadoArtistas);
    document
        .querySelector("#mnuAltaCancion")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuBuscarCancion")
        .addEventListener("click", mostrarFormulario);
    document
        .querySelector("#mnuListadoCancion")
        .addEventListener("click", mostrarListadoCanciones);
    document
        .querySelector("#mnuListadoArtistaCanciones")
        .addEventListener("click", mostrarFormulario);

    frmAltaArtista.btnAceptarAltaArtista.addEventListener("click", procesarAltaArtista);
    frmEditarArtista.btnAceptarEditarArtista.addEventListener("click", procesarEditarArtista);
    frmBuscarArtista.btnBuscarArtista.addEventListener("click", procesarBuscarArtista);
    frmAltaCancion.btnAceptarAltaCancion.addEventListener("click", procesarAltaCancion);
    frmEditarCancion.btnAceptarEditarCancion.addEventListener("click", procesarEditarCancion);
    frmBuscarCancion.btnBuscarCancion.addEventListener("click", procesarBuscarCancion);
    frmListadoArtistaCanciones.btnListadoArtistaCanciones.addEventListener("click", procesarListadoCancionesArtista);

    document.addEventListener('DOMContentLoaded', function () {
        var modalPresentacion = new bootstrap.Modal(document.querySelector("#modalPresentacion"));
        modalPresentacion.show();
    });
}
//Mostrar inicio
function mostrarInicio() {
    ocultarFormularios();
    document.querySelector("#bloqueInicio").style.display = "block";
}
//Mostrar formulario
function mostrarFormulario(oEvento) {
    let opcionMenu = oEvento.target.id;

    ocultarFormularios();

    switch (opcionMenu) {
        case "mnuAltaArtista":
            frmAltaArtista.style.display = "block";
            break;
        case "mnuBuscarArtista":
            frmBuscarArtista.style.display = "block";
            break;
        case "mnuAltaCancion":
            frmAltaCancion.style.display = "block";
            break;
        case "mnuBuscarCancion":
            frmBuscarCancion.style.display = "block";
            break;
        case "mnuListadoArtistaCanciones":
            frmListadoArtistaCanciones.style.display = "block";
            break;
    }
}
//Ocultar todos los formularios
function ocultarFormularios() {
    bloqueInicio.style.display = "none";
    frmAltaArtista.style.display = "none";
    frmEditarArtista.style.display = "none";
    frmBuscarArtista.style.display = "none";
    frmAltaCancion.style.display = "none";
    frmEditarCancion.style.display = "none";
    frmBuscarCancion.style.display = "none";
    frmListadoArtistaCanciones.style.display = "none";
    listadoArtistaCanciones.style.display = "none";
    resultadoBusquedaArtista.innerHTML = "";
    resultadoBusquedaCancion.innerHTML = "";
}
//Mostrar toast de exito
function mostrarToastExito(mensaje) {
    document.getElementById("toastHeaderMessage").innerHTM = ""
    document.getElementById("toastHeaderMessage").innerHTML = "<i class='bi bi-check-circle-fill text-success'> Éxito</i>";

    document.getElementById("toastMessage").innerText = mensaje;

    var toastEl = new bootstrap.Toast(document.getElementById('liveToast'));
    toastEl.show();
}
//Mostrar toast de error
function mostrarToastError(mensaje) {
    document.getElementById("toastHeaderMessage").innerHTM = ""
    document.getElementById("toastHeaderMessage").innerHTML = "<i class='bi bi-exclamation-circle-fill text-danger'> Error</i>";

    document.getElementById("toastMessage").innerText = mensaje;

    var toastEl = new bootstrap.Toast(document.getElementById('liveToast'));
    toastEl.show();
}
//Mostrar modal de error
function mostrarModalError(mensaje) {
    document.getElementById("modalTitle").innerHTM = ""
    document.getElementById("modalTitle").innerHTML = "<i class='bi bi-exclamation-circle-fill text-danger'> Error</i>";

    document.getElementById("modalBodyText").innerText = "";
    document.getElementById("modalBodyText").innerText = mensaje;

    var modalPresentacion = new bootstrap.Modal(document.querySelector("#modalPresentacion"));
    modalPresentacion.show();
}

/*******************************************FUNCIONES DE ARTISTAS*********************************************/
//Procesar alta artista
async function procesarAltaArtista() {
    if (validarAltaArtista()) {
        let nombre = frmAltaArtista.txtArtistaNombre.value.trim().toLowerCase();
        let genero = frmAltaArtista.txtArtistaGenero.value.trim().toLowerCase();
        let nacionalidad = frmAltaArtista.txtArtistaNacionalidad.value.trim().toLowerCase();
        let album = frmAltaArtista.txtArtistaAlbum.value.trim().toLowerCase();
        let premio = frmAltaArtista.txtArtistaPremio.value.trim().toLowerCase();
        let biografia = frmAltaArtista.txtArtistaBio.value.trim().toLowerCase();

        let respuesta = await oArtista.altaArtista(new Artista(null, nombre, genero, nacionalidad, album, premio, biografia));


        if (!respuesta.error) {
            mostrarToastExito(respuesta.mensaje);
            frmAltaArtista.reset();
            mostrarInicio();
        } else {
            mostrarToastError(respuesta.mensaje);
        }
    }
}
//Validar previamente los datos del artista
function validarAltaArtista() {
    let valido = true;
    let errores = "";

    let nombre = frmAltaArtista.txtArtistaNombre.value.trim();
    let genero = frmAltaArtista.txtArtistaGenero.value.trim();
    let nacionalidad = frmAltaArtista.txtArtistaNacionalidad.value.trim();
    let album = frmAltaArtista.txtArtistaAlbum.value.trim();
    let premio = frmAltaArtista.txtArtistaPremio.value.trim();
    let biografia = frmAltaArtista.txtArtistaBio.value.trim();

    if (nombre == "" || genero == "" || nacionalidad == "" || album == "" || premio == "" || biografia == "") {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        mostrarModalError(errores)
    }
    return valido;
}
// Procesos de botones de artista
async function procesarBuscarArtista() {
    if (validarBuscarArtista()) {

        let idArtista = frmBuscarArtista.txtIdArtista.value.trim().toLowerCase();

        let respuesta = await oArtista.buscarArtista(idArtista);

        if (!respuesta.error) {
            let resultadoBusqueda = document.querySelector("#resultadoBusquedaArtista");
            let artista = respuesta.datos;
            let tablaSalida = "<table class='table table-striped' id='listadoArtistaTable'>";

            tablaSalida += "<thead><tr><th>ID</th><th>NOMBRE</th><th>GENERO</th><th>NACIONALIDAD</th><th>ALBUM</th><th>PREMIO</th><th>BIOGRAFIA</th></tr></thead>";
            tablaSalida += "<tbody><tr>";
            tablaSalida += "<td>" + artista.artist_id + "</td>"
            tablaSalida += "<td>" + artista.artist_name + "</td>"
            tablaSalida += "<td>" + artista.genre + "</td>"
            tablaSalida += "<td>" + artista.nationality + "</td>"
            tablaSalida += "<td>" + artista.album + "</td>"
            tablaSalida += "<td>" + artista.award + "</td>"
            tablaSalida += "<td>" + artista.biography + "</td>"
            tablaSalida += "<td><button class='btn btn-danger' id='btnBorrarArtista' data-idartista='" + artista.artist_id + "'><i class='bi bi-trash'></i></button></td>";
            tablaSalida += "<td><button class='btn btn-primary' id='btnEditarArtista' data-artista='" + JSON.stringify(artista) + "'><i class='bi bi-pencil-square'></i></button></td>";
            tablaSalida += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = 'block';

            mostrarToastExito(respuesta.mensaje);

            document.querySelector("#btnBorrarArtista").addEventListener("click", borrarArtista);
            document.querySelector("#btnEditarArtista").addEventListener("click", procesarBotonEditarArtista);
        } else {
            mostrarToastError(respuesta.mensaje);
        }
    }
}
//Validar previamente los datos del artista
function validarBuscarArtista() {
    let idArtista = frmBuscarArtista.txtIdArtista.value.trim();
    let valido = true;
    let errores = "";

    if (idArtista == "") {
        valido = false;
        errores += "Faltan datos por rellenar";
    } else if (isNaN(idArtista)) {
        valido = false;
        errores += "Id de artista no es un número";
    }

    if (!valido) {
        mostrarModalError(errores);
    }
    return valido;
}
//Procesar la edicion de un artista
function procesarBotonEditarArtista(oEvento) {
    let boton = null;

    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
        if (oEvento.target.nodeName == "I") {
            boton = oEvento.target.parentElement;
        } else {
            boton = oEvento.target;
        }
        
        let dataArtista = boton.dataset.artista;

        ocultarFormularios();
        frmEditarArtista.style.display = "block";

        let artista = JSON.parse(dataArtista);

        frmEditarArtista.txtArtistaIdEdit.value = artista.artist_id;
        frmEditarArtista.txtArtistaNombreEdit.value = artista.artist_name;
        frmEditarArtista.txtArtistaGeneroEdit.value = artista.genre;
        frmEditarArtista.txtArtistaNacionalidadEdit.value = artista.nationality;
        frmEditarArtista.txtArtistaAlbumEdit.value = artista.album;
        frmEditarArtista.txtArtistaPremioEdit.value = artista.award;
        frmEditarArtista.txtArtistaBioEdit.value = artista.biography;
    }
}
//Editar artista
async function procesarEditarArtista() {
    let id = parseInt(frmEditarArtista.txtArtistaIdEdit.value);
    let nombre = frmEditarArtista.txtArtistaNombreEdit.value.trim();
    let genero = frmEditarArtista.txtArtistaGeneroEdit.value.trim();
    let nacionalidad = frmEditarArtista.txtArtistaNacionalidadEdit.value.trim();
    let album = frmEditarArtista.txtArtistaAlbumEdit.value.trim();
    let premio = frmEditarArtista.txtArtistaPremioEdit.value.trim();
    let biografia = frmEditarArtista.txtArtistaBioEdit.value.trim();

    if (validarEditarArtista()) {
        let respuesta = await oArtista.editarArtista(new Artista(id, nombre, genero, nacionalidad, album, premio, biografia));

        if (!respuesta.error) {
            mostrarToastExito(respuesta.mensaje);
            mostrarInicio();
            frmEditarArtista.reset();
        } else {
            mostrarToastError(respuesta.mensaje);
        }
    }
}
//Validar previamente los datos del artista
function validarEditarArtista() {
    let nombre = frmEditarArtista.txtArtistaNombreEdit.value.trim();
    let genero = frmEditarArtista.txtArtistaGeneroEdit.value.trim();
    let nacionalidad = frmEditarArtista.txtArtistaNacionalidadEdit.value.trim();
    let album = frmEditarArtista.txtArtistaAlbumEdit.value.trim();
    let premio = frmEditarArtista.txtArtistaPremioEdit.value.trim();
    let biografia = frmEditarArtista.txtArtistaBioEdit.value.trim();

    let valido = true;
    let errores = "";

    if (nombre = "" || genero == "" || nacionalidad == "" || album == "" || premio == "" || biografia == "") {
        valido = false;
        errores += "No puede haber campos vacíos";
    }

    if (!valido) {
        mostrarModalError(errores);
    }

    return valido;
}
//Borrar artista
async function borrarArtista(oEvento) {
    let boton = null;

    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
        if (oEvento.target.nodeName == "I") {
            boton = oEvento.target.parentElement;
        } else {
            boton = oEvento.target;
        }

        let idArtista = boton.dataset.idartista;

        let respuesta = await oArtista.borrarArtista(idArtista);

        if (!respuesta.error) {
            mostrarToastExito(respuesta.mensaje);
            document.querySelector("#resultadoBusquedaArtista").innerHTML = "";
        } else {
            mostrarToastError(respuesta.mensaje);
        }
    }
}
// Mostrar listado de todos los artistas
function mostrarListadoArtistas() {
    open("listado_artistas.html ");
}
//Listado de canciones de un artista
async function procesarListadoCancionesArtista() {
    let idArtista = parseInt(frmListadoArtistaCanciones.txtIdArtistaListado.value);

    let respuesta = await oArtista.listadoCancionesArtista(idArtista);

    if (respuesta.error) {
        mostrarModalError(respuesta.mensaje);
    } else {
        let resultadoBusqueda = document.querySelector("#listadoArtistaCanciones");

        let tablaSalida = "<table class='table' id='tablaListadoCancionesArtista'>";
        tablaSalida += "<thead><tr><th>ID CANCION</th><th>NOMBRE</th><th>DURACION</th><th>AÑO DE LANZAMIENTO</th><th>ALBUM</th><th>LETRA</th><th>VIDEO URL</th><th>ID ARTISTA</th></tr></thead><tbody>";

        for (let cancion of respuesta.datos) {
            tablaSalida += "<tr><td>" + cancion.song_id + "</td>"
            tablaSalida += "<td>" + cancion.song_title + "</td>"
            tablaSalida += "<td>" + cancion.duration + "</td>"
            tablaSalida += "<td>" + cancion.release_year + "</td>"
            tablaSalida += "<td>" + cancion.album + "</td>"
            tablaSalida += "<td>" + cancion.lyric + "</td>"
            tablaSalida += "<td>" + cancion.videoUrl + "</td>"
            tablaSalida += "<td>" + cancion.artist_id + "</td>"
            tablaSalida += "<td><button class='btn btn-danger' id='btnBorrarCancion' data-idcancion='" + cancion.song_id + "'><i class='bi bi-trash'></i></button></td>";
            tablaSalida += "<td><button class='btn btn-primary' id='btnEditarCancion'  data-cancion='" + JSON.stringify(cancion) + "'><i class='bi bi-pencil-square'></i></button></td></tr>";
        }

        tablaSalida += "</tbody></table>";

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';

        mostrarToastExito(respuesta.mensaje);

        document.querySelector("#btnBorrarCancion").addEventListener("click", borrarCancion);
        document.querySelector("#btnEditarCancion").addEventListener("click", procesarBotonEditarCancion);
    }
}
/*******************************************FUNCIONES DE CANCIONES*********************************************/
//Procesar alta cancion
async function procesarAltaCancion() {
    if (validarAltaCancion()) {
        let nombre = frmAltaCancion.txtCancionNombre.value.trim().toLowerCase();
        let duracion = frmAltaCancion.txtCancionDuracion.value.trim().toLowerCase();
        let lanzamiento = frmAltaCancion.txtCancionLanzamiento.value.trim().toLowerCase();
        let album = frmAltaCancion.txtCancionAlbum.value.trim().toLowerCase();
        let letra = frmAltaCancion.txtCancionLetra.value.trim().toLowerCase();
        let url = frmAltaCancion.txtCancionUrl.value.trim().toLowerCase();
        let idArtista = parseInt(frmAltaCancion.txtCancionArtistaId.value);

        let respuesta = await oCancion.altaCancion(new Cancion(null, nombre, duracion, lanzamiento, album, letra, url, idArtista));

        if (!respuesta.error) {
            mostrarToastExito(respuesta.mensaje);

            frmAltaCancion.reset();
            mostrarInicio();
        } else {
            mostrarToastError(respuesta.mensaje);
        }
    }
}
//Validar previamente los datos de la cancion
function validarAltaCancion() {
    let valido = true;
    let errores = "";

    let nombre = frmAltaCancion.txtCancionNombre.value.trim();
    let duracion = frmAltaCancion.txtCancionDuracion.value.trim();
    let lanzamiento = frmAltaCancion.txtCancionLanzamiento.value.trim();
    let album = frmAltaCancion.txtCancionAlbum.value.trim();
    let letra = frmAltaCancion.txtCancionLetra.value.trim();
    let url = frmAltaCancion.txtCancionUrl.value.trim();
    let idArtista = parseInt(frmAltaCancion.txtCancionArtistaId.value);

    if (nombre == "" || duracion == "" || lanzamiento == "" || album == "" || letra == "" || url == "" || idArtista == "") {
        valido = false;
        errores += "Faltan datos por rellenar";
    } else if (isNaN(idArtista)) {
        valido = false;
        errores += "Id de artista no es un número";
    }
    if (!valido) {
        mostrarModalError(errores);
    }
    return valido;
}
// Procesar la edicion de una cancion
async function procesarBuscarCancion() {
    if (validarBuscarCancion()) {
        let idCancion = parseInt(frmBuscarCancion.txtIdCancion.value);

        let respuesta = await oCancion.buscarCancion(idCancion);

        if (!respuesta.error) {
            let resultadoBusqueda = document.querySelector("#resultadoBusquedaCancion");
            let cancion = respuesta.datos;
            let tablaSalida = "<table class='table'>";

            tablaSalida += "<thead><tr><th>ID CANCION</th><th>NOMBRE</th><th>DURACION</th><th>AÑO DE LANZAMIENTO</th><th>ALBUM</th><th>LETRA</th><th>VIDEO URL</th><th>ID ARTISTA</th></tr></thead>";
            tablaSalida += "<tbody><tr>";
            tablaSalida += "<td>" + cancion.song_id + "</td>"
            tablaSalida += "<td>" + cancion.song_title + "</td>"
            tablaSalida += "<td>" + cancion.duration + "</td>"
            tablaSalida += "<td>" + cancion.release_year + "</td>"
            tablaSalida += "<td>" + cancion.album + "</td>"
            tablaSalida += "<td>" + cancion.lyric + "</td>"
            tablaSalida += "<td>" + cancion.videoUrl + "</td>"
            tablaSalida += "<td>" + cancion.artist_id + "</td>"
            tablaSalida += "<td><button class='btn btn-danger' id='btnBorrarCancion' data-idcancion='" + cancion.song_id + "'><i class='bi bi-trash'></i></button></td>";
            tablaSalida += "<td><button class='btn btn-primary' id='btnEditarCancion' data-cancion='" + JSON.stringify(cancion) + "'><i class='bi bi-pencil-square'></i></button></td>";
            tablaSalida += "</tr></tbody></table>";

            resultadoBusqueda.innerHTML = tablaSalida;
            resultadoBusqueda.style.display = 'block';

            mostrarToastExito(respuesta.mensaje);

            document.querySelector("#btnBorrarCancion").addEventListener("click", borrarCancion);
            document.querySelector("#btnEditarCancion").addEventListener("click", procesarBotonEditarCancion);
        } else {
            mostrarToastError(respuesta.mensaje);
        }
    }
}
//Validar previamente los datos de la cancion
function validarBuscarCancion() {
    let idCancion = parseInt(frmBuscarCancion.txtIdCancion.value);
    let valido = true;
    let errores = "";

    if (isNaN(idCancion)) {
        valido = false;
        errores += "Id de cancion no es un número";
    } else if (idCancion == "") {
        valido = false;
        errores += "Faltan datos por rellenar";
    }

    if (!valido) {
        mostrarModalError(errores);
    }

    return valido;
}
//Procesamos la edicion de una cancion
function procesarBotonEditarCancion(oEvento) {
    let boton = null;

    if (oEvento.target.nodeName == "I" || oEvento.target.type == "I" || oEvento.target.nodeName == "BUTTON") {
        if (oEvento.target.nodeName == "I") {
            boton = oEvento.target.parentElement;
        } else {
            boton = oEvento.target;
        }
        let dataCancion = boton.dataset.cancion;

        ocultarFormularios();
        frmEditarCancion.style.display = "block";

        let cancion = JSON.parse(dataCancion);

        frmEditarCancion.txtCancionIdEdit.value = cancion.song_id;
        frmEditarCancion.txtCancionNombreEdit.value = cancion.song_title;
        frmEditarCancion.txtCancionDuracionEdit.value = cancion.duration;
        frmEditarCancion.txtCancionLanzamientoEdit.value = cancion.release_year;
        frmEditarCancion.txtCancionAlbumEdit.value = cancion.album;
        frmEditarCancion.txtCancionLetraEdit.value = cancion.lyric;
        frmEditarCancion.txtCancionUrlEdit.value = cancion.videoUrl;
        frmEditarCancion.txtCancionArtistaIdEdit.value = cancion.artist_id;

        frmListadoArtistaCanciones.style.display = "none";
        document.querySelector("#listadoArtistaCanciones").innerHTML = "";
    }
}
//Editar cancion
async function procesarEditarCancion() {
    let id = parseInt(frmEditarCancion.frmEditarCancion.value);
    let nombre = frmEditarCancion.txtCancionNombreEdit.value.trim();
    let duracion = frmEditarCancion.txtCancionDuracionEdit.value.trim();
    let lanzamiento = frmEditarCancion.txtCancionLanzamientoEdit.value.trim();
    let album = frmEditarCancion.txtCancionAlbumEdit.value.trim();
    let letra = frmEditarCancion.txtCancionLetraEdit.value.trim();
    let url = frmEditarCancion.txtCancionUrlEdit.value.trim();
    let idArtista = parseInt(frmEditarCancion.txtCancionArtistaIdEdit.value);

    if (validarEditarCancion()) {
        let respuesta = await oArtista.editarArtista(new Cancion(id, nombre, duracion, lanzamiento, album, letra, url, idArtista));

        if (!respuesta.error) {
            mostrarToastExito(respuesta.mensaje);

            frmEditarCancion.reset();
            mostrarInicio();
        } else {
            mostrarToastError(respuesta.mensaje);
        }
    }
}
//Validar previamente los datos de la cancion
function validarEditarCancion() {
    let nombre = frmEditarCancion.txtCancionNombreEdit.value.trim();
    let duracion = frmEditarCancion.txtCancionDuracionEdit.value.trim();
    let lanzamiento = frmEditarCancion.txtCancionLanzamientoEdit.value.trim();
    let album = frmEditarCancion.txtCancionAlbumEdit.value.trim();
    let letra = frmEditarCancion.txtCancionLetraEdit.value.trim();
    let url = frmEditarCancion.txtCancionUrlEdit.value.trim();
    let idArtista = parseInt(frmEditarCancion.txtCancionArtistaIdEdit.value);

    let valido = true;
    let errores = "";

    if (nombre = "" || duracion == "" || lanzamiento == "" || album == "" || letra == "" || url == "" || idArtista == "") {
        valido = false;
        errores += "No puede haber campos vacíos";
    } else if (isNaN(idArtista)) {
        valido = false;
        errores += "Id de artista no es un número";
    }

    if (!valido) {
        mostrarModalError(errores);
    }
    return valido;
}
//Borrar cancion
async function borrarCancion(oEvento) {
    let boton = null;

    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "BUTTON") {
        if (oEvento.target.nodeName == "I") {
            boton = oEvento.target.parentElement;
        } else {
            boton = oEvento.target;
        }

        let idCancion = boton.dataset.idcancion;

        let respuesta = await oCancion.borrarCancion(idCancion);
        if (!respuesta.error) {
            mostrarToastExito(respuesta.mensaje);
            document.querySelector("#resultadoBusquedaCancion").innerHTML = "";
        } else {
            mostrarToastError(respuesta.mensaje);
        }
    }
}
// Mostrar listado de todos los artistas
function mostrarListadoCanciones() {
    open("listado_canciones.html ");
}
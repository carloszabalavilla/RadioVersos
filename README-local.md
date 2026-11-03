# RadioVersos · paquete Windows

Requiere Node22/24 y MySQL Server8.0 instalado. PHP8.4.27 y su licencia se incluyen en este paquete. Extrae todo y ejecuta node start.cjs o Iniciar.cmd. Si MySQL está en otra ubicación, define MYSQL_HOME. No hace falta arrancar ni modificar tu servicio MySQL: se crea una instancia aislada en .runtime/mysql, en un puerto libre de loopback.

Abre http://127.0.0.1:8084/app/. Incluye un artista y una canción ficticios. Comprueba listados, búsquedas, altas, edición y borrado; elimina las canciones de un artista antes de borrarlo. Ctrl+C detiene ambos procesos. Se conservan tus datos de esta demo entre arranques. Las consultas aceptan apóstrofes y el texto se escapa al mostrarse.

La aplicación original no tiene autenticación; úsala exclusivamente en local. La alternativa Docker está descrita en README.MD y no se ha ejecutado en la máquina de validación.

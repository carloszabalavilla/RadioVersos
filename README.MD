# RadioVersos

Catálogo web de artistas y canciones, desarrollado con PHP, JavaScript y MySQL.
Se conservan la licencia original y el historial del proyecto.

## Arranque local

Requiere Docker con Compose. Desde esta carpeta:

```powershell
docker compose up --build
```

Abre http://localhost:8084/app/. Ctrl+C detiene los servicios; docker compose down retira los contenedores y reinicia los datos de demo.
La base de datos solo es accesible dentro de la red de Compose. Las contraseñas incluidas son exclusivamente de demostración local.

Alternativa sin Docker: PHP 8.2+ con mysqli y MySQL 8.0. Importa database/demo.sql en una instancia vacía, configura DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD y DB_NAME=catalogo, y ejecuta php -S 127.0.0.1:8084 -t www.

La demo usa un artista y una canción ficticios. Permite crear, consultar, editar y borrar registros; elimina primero las canciones de un artista antes de borrarlo.
Las consultas están parametrizadas y aceptan apóstrofes en nombres y letras. El editor usa la columna lyric del esquema.

La aplicación original no incluye autenticación. Esta distribución está preparada para uso local; no se debe publicar como servicio abierto.

Prueba HTTP reproducible después del arranque: `node scripts/smoke.cjs` (Node22/24). Utiliza y elimina únicamente registros ficticios de prueba.

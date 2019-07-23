# Nodepop

Nodepop es una API de demostración de un servicio de venta de artículos de segunda mano. Está especialmente diseñada para desarrolladores de iOS o Android.

El servicio mantiene anuncios de compra o venta de artículos y permite buscar así como poner filtros por varios criterios.

## Instalando Nodepop
Nodepop está subida en el repositorio público de GitLab:
https://gitlab.keepcoding.io/pablesite/practica-backend-node.js

Como con cualquier repositorio, se puede clonar, en el directorio en el que estemos posicionados, con:

```bash
git clone https://gitlab.keepcoding.io/pablesite/practica-backend-node.js
```
A continuación hay que instalar los módulos necesarios:

```bash
npm install
```

## Requisito - MongoDB

La instalación de MongoDB no es objeto de este README. Cada SO tiene sus particularidades. 

Una vez instalado, en Windows el servicio debe arrancar de manera predeterminada. En Linux o Mac puedes arrancar el servidor local de mongoDB con:

```bash
./bin/mongodb --dbpath ./data/db --directoryperdb
```
¡Atención a las rutas que has usado en tu instalación!

A partir de este momento, tenemos la API instalada y la base de datos preparada. Aún hay que introducir datos en la base de datos y arrancar la API.

## Inicialización de la base de datos.
Es recomendable inicializar la base de datos la primera vez que se empieza a usar la API. Para esto, se ha preparado un fichero llamado 'archivos.json' con 6 anuncios predefinidos. No es recomendable modificarlo, aunque si se quieren añadir o editar anuncios que se carguen en la inicialización, este es el sitio.

Para inicializar la base de datos hay que escribir en consola:

```bash
npm run db
```
A partir de aquí, ya hay anuncios en la base de datos.

## Arranque de la API


npm run dev --> desarrollador (lanza el nodemon)

Al fin ya está todo listo. La API está preparada para recibir consultas.


 a través de la URL:

```bash
http://localhost:3000/apiv1/anuncios
```

## Uso de la API

## Uso de la Página Web

## Licencia
[Pablo Ruiz Molina] Repositorio público para el Bootcamp de Desarrollo Web de Keepcoding.



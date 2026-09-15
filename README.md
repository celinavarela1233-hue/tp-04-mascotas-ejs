# Trabajo práctico 04

## Descripción
Aplicación web para consultar mascotas en adopción y agregar temporalmente nuevos registros
mediante un formulario.

## Instalación
1. Crear un repositorio en github
2. Clonar dijo repositorio
3. instalar:
    npm init -y
    npm install express ejs express-ejs-layouts

## Ejecución
node src/index.js y queda disponible en http://localhost:3000

## Páginas y rutas
GET  /                  Pagina de inicio
GET  /mascotas          Pagina del listado de las mascotas
GET  /mascotas/nueva    Pagina para agregar una nueva mascota
GET  /mascotas/:id      Pagina de id de una mascota unica
POST /mascotas          Pagina con la nueva mascota agregada


## Estructura de vistas
views/
   |-- layouts/
   |   `-- main.ejs
   |-- partials/
   |   |-- encabezado.ejs
   |   `-- pie.ejs
   |-- mascotas/
   |   |-- lista.ejs
   |   |-- detalle.ejs
   |   `-- nueva.ejs
   |-- inicio.ejs
   `-- no-encontrado.ejs


## Recursos estáticos
public/
   |-- css/
   |   `-- estilos.css
   |-- img/
   |   `-- mascota.svg
   `-- js/
       `-- app.js

## Formulario
Se incluyen controles etiquetados para:
- nombre;
- especie;
- edad;
- estado;
- descripción.


## Persistencia de los datos
Se crearon al menos cinco registros propios en datos/mascotas.json
- id
- nombre
- especie
- edad
- descripcion
- estado
- imagen
Las mascotas que se agregan desde el formulario se guardan solo en la memoria del proceso

## RESPUESTAS
- Diferencia entre layout, vista y parcial
    Layout: estrctura general de una pagina
    Vista: pagina completa que se muestra al usuario
    Parcial: pedazo de HTML que se reutiliza en varias vistas.

- Datos enviados a una vista mediante res.render 
    res.render() sirve para renderizar una vista EJS y enviarle datos

- Función de express.static 
    Sirve para que Express pueda acceder a archivos estáticos

- Función de express.urlencoded 
    Sirve para que Express pueda leer los datos enviados desde formularios HTML mediante POST

- Recorrido POST, redirección y GE
    Cuando el usuario completa el formulario y toca guardar,
    POST el navegador manda los datos,
    REDIRECCION lo dirige a la lista con el nuevo dato que agrego en el formulario, 
    GET se ejecuta y muestra todo 

- Motivo por el cual el nuevo registro desaparece al reiniciar.
    Porque están almacenados en memoria y no tienen persistencia


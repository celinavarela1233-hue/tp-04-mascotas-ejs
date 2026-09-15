const express = require("express");
const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");

const { leerJson } = require("./archivos");

const app = express();

const PORT = 3000;

const rutaDatos = path.join(__dirname, "..", "datos", "mascotas.json");

async function main() {

  try{

    const mascotas = await leerJson(rutaDatos);

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "..", "views"));

    app.use(expressLayouts);
    app.set("layout", "layouts/main");

    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req, res) => {
      res.render("inicio", {
          titulo: "Inicio" });
    });

    app.get("/mascotas", (req, res) => {
      res.render("mascotas/lista", { 
        mascotas,
        titulo: "Mascotas" });
    });

    app.get("/mascotas/nueva", (req, res) => {
      res.render("mascotas/nueva", {
        titulo: "Agregar mascota nueva",
        error: null,
        valores: {}
      });
    });

    app.get("/mascotas/:id", (req, res) => {

      const id = Number(req.params.id);

      const mascota = mascotas.find(m => m.id === id);

      if (!mascota) {
        return res.status(404).render("no-encontrado",{
          titulo: "Mascota no encontrada"
        });
      }

      res.render("mascotas/detalle", { 
        mascota,
        titulo: mascota.nombre });

    });

    app.post("/mascotas", (req, res) => {

      const { nombre, especie, edad, estado, descripcion } = req.body;

      const edadNumero = Number(edad);

      if (
        !nombre ||
        !especie ||
        !edad ||
        !estado ||
        !descripcion ||
        !Number.isInteger(edadNumero) ||
        edadNumero < 0
      ) {

        return res.status(400).render("mascotas/nueva", {
          titulo: "Agregar mascota NUEVA",
          error: "Por favor, completá todos los campos correctamente.",
            valores: {
            nombre,
            especie,
            edad,
            estado,
            descripcion
          }
        });
      }

      const nuevoId = mascotas.length > 0? Math.max(...mascotas.map(mascota => mascota.id)) + 1 : 1;

      mascotas.push({
        id: nuevoId,
        nombre,
        especie,
        edad: edadNumero,
        estado,
        descripcion,
        imagen: "/img/mascotas.svg"
      });

      res.redirect("/mascotas");
    });


    app.listen(PORT, () => {
    console.log(`Aplicación disponible en http://localhost:${PORT}`);
    });

  }

  catch(error) {

  console.error("No se pudo iniciar la aplicación:", error);
  process.exitCode = 1;

  }
  
}

main();


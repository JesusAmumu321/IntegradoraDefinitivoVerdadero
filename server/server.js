import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connect from "./coneccionMYSQL.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/index.html"), (err) => {
    if (err) {
      console.error("Error encontrando el archivo:", err);
      res.status(err.status).end();
    }
  });
});

app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/login.html"), (err) => {
    if (err) {
      console.error("Error encontrando el archivo:", err);
      res.status(err.status).end();
    }
  });
});

app.get("/registro", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/registro.html"), (err) => {
    if (err) {
      console.error("Error encontrando el archivo:", err);
      res.status(err.status).end();
    }
  });
});

// Rutas para la API
app.post("/api/registrar", async (req, res) => {
  const { usuario, correo, contrasena } = req.body;

  // no lo creo necesario pq todos los campos son obligatorios
//   if (!usuario || !correo || !contrasena) {
//     return res.status(400).json({ //req 400 indica una peticion mala 
//       success: false,
//       message: "Todos los campos son obligatorios",
//     });
//   }
  try {
    const db = await connect();
    
    const [result] = await db.execute(
      "INSERT INTO usuarios (nombre_usuario, correo, contrasena) VALUES (?, ?, ?)",
      [usuario, correo, contrasena]
    );

    await db.end();

  } catch (error) {

    console.error("Error al insertar datos:", error);

  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connect from "./coneccionMYSQL.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/index.html"));
  if (err) {
    console.error("error encontrando el archivo:", err);
    res.status(err.status).end();
  }
});

app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/login.html"), (err) => {
    if (err) {
      console.error("error encontrando el archivo:", err);
      res.status(err.status).end();
    }
  });
});

app.get("/registro", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/registro.html"), (err) => {
    if (err) {
      console.error("error encontrando el archivo:", err);
      res.status(err.status).end();
    }
  });
});

// rutas para la api
app.post("/api/registrar", async (req, res) => {
  const { usuario, correo, contrasena } = req.body;

  try {
    const db = await connect();
    const [result] = await db.execute(
      "INSERT INTO usuarios (nombre_usuario, correo, contrasena) VALUES (?, ?, ?)",
      [usuario, correo, contrasena]
    );
    await db.end();
    res
      .status(201)
      .json({ success: true, message: "usuario registrado con éxito" });
  } catch (error) {
    console.error("error al insertar datos:", error);
    res
      .status(500)
      .json({ success: false, message: "error al registrar usuario" });
  }
});

// iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));

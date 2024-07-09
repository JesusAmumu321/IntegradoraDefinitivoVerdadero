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
  res.sendFile(join(__dirname, "../public/HTML/index.html")); 
});

app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/login.html")); 
});

app.get("/registro", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/registro.html")); 
});

// Rutas para la API
app.post("/api/registrar", async (req, res) => {
  const { nombreUser, correoUser, contra } = req.body;

  try {
    const db = await connect();
    const [result] = await db.execute(
      "INSERT INTO usuarios (nombre_usuario, correo, contrasena) VALUES (?, ?, ?)",
      [nombreUser, correoUser, contra]
    );
    await db.end();
    res.json({
      success: true,
      message: "Usuario registrado con éxito",
      data: result,
    });
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al registrar usuario" });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

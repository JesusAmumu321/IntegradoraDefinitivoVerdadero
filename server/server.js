import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connect from "./coneccionMYSQL.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "../public")));

// Rutas existentes
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/index.html"), (err) => {
    if (err) {
      console.error("Error encontrando el archivo:", err);
      res.status(500).end();
    }
  });
});

app.get("/login", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/login.html"), (err) => {
    if (err) {
      console.error("Error encontrando el archivo:", err);
      res.status(500).end();
    }
  });
});

app.get("/registro", (req, res) => {
  res.sendFile(join(__dirname, "../public/HTML/registro.html"), (err) => {
    if (err) {
      console.error("Error encontrando el archivo:", err);
      res.status(500).end();
    }
  });
});

// Nuevas rutas del primer código
app.post('/submit', async (req, res) => {
  const { tipo_medicamento, nombreMed, cantidadUnaCaja, cantidadCajas, caducidadMed, ultimaToma, cantidadDosis, frecuentaToma } = req.body;
  const sql = 'INSERT INTO medicamento (tipo_medicamento, cantidadUnaCaja, cantidadCajas, nombreMed, caducidadMed, ultimaToma, cantidadDosis, frecuentaToma) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  try {
    const db = await connect();
    await db.execute(sql, [tipo_medicamento, cantidadUnaCaja, cantidadCajas, nombreMed, caducidadMed, ultimaToma, cantidadDosis, frecuentaToma]);
    await db.end();
    res.send('Datos guardados en la base de datos');
  } catch (error) {
    console.error('Error al insertar datos:', error);
    res.status(500).send('Error al guardar los datos en la base de datos');
  }
});

app.get('/getMedicamentos', async (req, res) => {
  const sql = 'SELECT nombreMed, caducidadMed, cantidadUnaCaja, cantidadDosis, frecuentaToma, ultimaToma FROM medicamento';
  
  try {
    const db = await connect();
    const [result] = await db.execute(sql);
    await db.end();
    res.json(result);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).send('Error al obtener los datos de la base de datos');
  }
});

// Rutas existentes del segundo código
app.post("/api/verificar-correo", async (req, res) => {
  const { correo } = req.body;
  try {
    const db = await connect();
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE correo = ?", [correo]);
    await db.end();
    res.json({ existe: rows.length > 0 });
  } catch (error) {
    console.error("Error al verificar el correo:", error);
    res.status(500).json({ mensaje: "Error al verificar el correo" });
  }
});

app.post("/api/registrar", async (req, res) => {
  const { usuario, correo, contrasena } = req.body;
  try {
    const db = await connect();
    await db.execute(
      "INSERT INTO usuarios (nombre_usuario, correo, contrasena) VALUES (?, ?, ?)",
      [usuario, correo, contrasena]
    );
    await db.end();
    res.status(200).json({ success: true, message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error al insertar datos:", error);
    res.status(500).json({ success: false, message: "Error al registrar usuario" });
  }
});

app.post("/api/iniciar", async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const db = await connect();
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE correo = ?", [correo]);
    await db.end();
    if (rows.length > 0) {
      const user = rows[0];
      if (user.contrasena === contrasena) {
        res.json({ autenticado: true, mensaje: "Inicio de sesión exitoso" });
      } else {
        res.status(400).json({ autenticado: false, mensaje: "Contraseña incorrecta" });
      }
    } else {
      res.status(401).json({ autenticado: false, mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ autenticado: false, mensaje: "Error al iniciar sesión" });
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
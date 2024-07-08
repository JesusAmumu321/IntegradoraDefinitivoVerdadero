import connect from "./coneccionMYSQL.js";

const seleccionarLenguajes = async () => {
  // establecemos conecion a base de datos
  const db = await connect();
  try {
    // ejecutamos la consulta
    ("SELECT id, nombre, desarrolladores, activa FROM lenguajes;");
    const [seleccion] = await db.execute();

    // mostramos resultado en forma de tabla, si se quiere de otra manera, colocar console.log(seleccion)
    console.table(seleccion);
  } catch (error) {
    // mensaje de error
    console.log("\n");
    console.log("----------------------------------");
    console.error("Error al obtener los lenguajes:", error);
    console.log("----------------------------------");
    console.log("\n");
  } finally {
    // cerrar conexion
    db.end();
  }
};

async function insertarDatos(nombre, desarrolladores, activa) {
  // establecemos conexion a base de datos
  const db = await connect();
  try {
    // consulta para ingresar los datos, en values se colocarn '?' dependiendo de los espacios para ingresar datos
    const [insertar] = await db.execute(
      "INSERT INTO lenguajes (nombre, desarrolladores, activa) VALUES (?, ?, ?)",
      [nombre, desarrolladores, activa]
    );

    // mostramos el resultado,
    console.log("Datos insertados: \n");
    console.table(insertar);
  } catch (error) {
    // mostrar si hay un error
    console.log("\n");
    console.log("----------------------------------");
    console.error("Error al insertar datos:", error);
    console.log("----------------------------------");
    console.log("\n");
  } finally {
    // cerramos la conexion, no importa si se ejecuto o no, por seguridad pa
    db.end();
  }
}

async function actualizarDatos(nombre, desarrolladores, activa, id) {
  const db = await connect();

  try {
    // query pa actualizar, se colocarn '?' dependiendo de los espacios para ingresar datos
    const [actualizar] = await db.execute(
      "UPDATE lenguajes SET nombre = ?, desarrolladores = ?, activa = ? where id = ?",
      [nombre, desarrolladores, activa, id]
    );

    // mostrar datos
    console.log("Se actualizaron los datos correctamente");
    console.table(actualizar);


  } catch (error) {
    console.log("\n");
    console.log("----------------------------------");
    console.error("Error al actualizar los datos", error);
    console.log("----------------------------------");
    console.log("\n");
  } finally {
    // cerrar conexion pa seguridad
    db.end();
  }
}

async function eliminarDatos(nombre){

  const db = await connect();

  try {
    const [eliminar] = await db.execute("DELETE FROM lenguajes where nombre = ?", [nombre]);

    console.log("Se eliminaron los datos correctamente \n");
    console.table(eliminar);

  } catch (error) {
    console.log("\n");
    console.log("----------------------------------");
    console.error("Error al eliminar los datos", error);
    console.log("----------------------------------");
    console.log("\n");
  }finally{
    db.end();
  }
}

// seleccionarLenguajes();
// insertarDatos("Java", 4, 0);
// actualizarDatos("Ruby", 5, 0, 3);
// eliminarDatos("java");

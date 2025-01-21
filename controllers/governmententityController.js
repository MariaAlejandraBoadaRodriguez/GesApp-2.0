const pool = require('../models/db'); // Conexión a la base de datos

const getEntity = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users.government_entity");
    res.status(200).json(result.rows); // Devuelve las posiciones como JSON
  } catch (error) {
    console.error("Error al obtener Entidades:", error);
    res.status(500).json({ message: "Error al obtener Entidades" });
  }
};

module.exports = { getEntity };

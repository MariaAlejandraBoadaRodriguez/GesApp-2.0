const pool = require('../models/db'); // Conexión a la base de datos

const getPositions = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users.position");
    res.status(200).json(result.rows); // Devuelve las posiciones como JSON
  } catch (error) {
    console.error("Error al obtener posiciones:", error);
    res.status(500).json({ message: "Error al obtener posiciones" });
  }
};

module.exports = { getPositions };

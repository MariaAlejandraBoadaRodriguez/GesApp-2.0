const pool = require('../models/db'); // Conexión a la base de datos

const getExperience = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users.experience_type");
    res.status(200).json(result.rows); // Devuelve las posiciones como JSON
  } catch (error) {
    console.error("Error al obtener Experiencia:", error);
    res.status(500).json({ message: "Error al obtener Experiencia" });
  }
};

module.exports = { getExperience };

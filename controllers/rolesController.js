const pool = require('../models/db'); // Conexión a la base de datos

const getRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users.roles");
    res.status(200).json(result.rows); // Devuelve los roles como JSON
  } catch (error) {
    console.error("Error al obtener roles:", error);
    res.status(500).json({ message: "Error al obtener roles" });
  }
};

module.exports = { getRoles };

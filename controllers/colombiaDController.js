const pool = require('../models/db'); // Conexión a la base de datos

const getDepartmentsColombia = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users.departments_colombia");
    res.status(200).json(result.rows); // Devuelve los departamentos como JSON
  } catch (error) {
    console.error("Error al obtener departamentos:", error);
    res.status(500).json({ message: "Error al obtener departamentos" });
  }
};

module.exports = { getDepartmentsColombia };
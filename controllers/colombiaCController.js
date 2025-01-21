const pool = require('../models/db'); // Conexión a la base de datos

const getCityColombia = async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM users.city_colombia");
      res.status(200).json(result.rows); // Devuelve los departamentos como JSON
    } catch (error) {
      console.error("Error al obtener ciudades:", error);
      res.status(500).json({ message: "Error al obtener ciudades" });
    }
  };

module.exports = {getCityColombia };
const express = require("express");
const {getCityColombia } = require("../controllers/colombiaCController");
const router = express.Router();

// Ruta para obtener los Ciudades
router.get("/", getCityColombia);

module.exports = router;

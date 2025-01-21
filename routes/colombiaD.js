const express = require("express");
const {getDepartmentsColombia } = require("../controllers/colombiaDController");
const router = express.Router();

// Ruta para obtener los Ciudades
router.get("/", getDepartmentsColombia);

module.exports = router;

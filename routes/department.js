const express = require("express");
const router = express.Router();
const { getDepartments } = require("../controllers/departmentController");

// Ruta para obtener los departamentos
router.get("/", getDepartments);

module.exports = router;

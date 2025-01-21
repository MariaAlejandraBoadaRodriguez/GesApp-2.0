const express = require("express");
const router = express.Router();
const { getExperience } = require("../controllers/experience");

// Ruta para obtener los departamentos
router.get("/", getExperience);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getEntity } = require("../controllers/governmententityController");

// Ruta para obtener los departamentos
router.get("/", getEntity);

module.exports = router;

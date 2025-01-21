const express = require("express");
const router = express.Router();
const { getPositions } = require("../controllers/positionController");

// Ruta para obtener las posiciones
router.get("/", getPositions);

module.exports = router;

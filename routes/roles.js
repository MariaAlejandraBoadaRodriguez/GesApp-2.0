const express = require("express");
const router = express.Router();
const { getRoles } = require("../controllers/rolesController");

// Ruta para obtener los roles
router.get("/", getRoles);

module.exports = router;

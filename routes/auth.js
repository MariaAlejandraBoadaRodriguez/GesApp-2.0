const express = require('express');
const { login } = require('../controllers/authController'); // Importar el controlador de autenticación
const router = express.Router();

// Definir la ruta POST para login
router.post('/login', login);

module.exports = router;

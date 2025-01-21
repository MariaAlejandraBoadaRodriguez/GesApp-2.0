const express = require('express');
const router = express.Router();
//const { getEntity } = require('../controllers/governmententityController');
const { createExperience, getLessonsByCedula, activateBuenaPractica, getLessons} = require('../controllers/createbpController');

// Ruta para obtener entidades
//router.get('/', getEntity);

// Ruta para obtener entidades
router.get('/:cedula', getLessonsByCedula);

// Ruta para crear una nueva experiencia
router.post('/', createExperience);

//Ruta para aprobar la buena practica
router.post('/:id_create_bp', activateBuenaPractica)

//Ruta para ver las buenas practicas
router.get('/', getLessons);

module.exports = router;

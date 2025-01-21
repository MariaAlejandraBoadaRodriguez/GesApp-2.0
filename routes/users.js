const express = require('express');
const { createUser, getUsers, updateUserByIdCard, getUserByIdCard, deactivateUserByIdCard, updateEducationUserByIdCard } = require('../controllers/userController');
const router = express.Router();

// Ruta para crear un usuario
router.post('/', createUser);

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para obtener los usuarios por ID
router.get('/:id_card', getUserByIdCard);


// Ruta para actualizar un usuario por cédula
router.put('/:id_card', updateUserByIdCard);

// Ruta para desactivar un usuario por cédula
router.put('/deactivate/:id_card', deactivateUserByIdCard);

// Ruta para actualizar la educacion del usuario autenticado
router.put('/api/users/:id', updateEducationUserByIdCard);

// Ruta para obtener el perfil del usuario autenticado
//router.get('/profile', getProfile);


module.exports = router;

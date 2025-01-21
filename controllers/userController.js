const pool = require('../models/db'); // Conexión a la base de datos
const bcrypt = require('bcrypt'); // Para encriptar contraseñas

// Crear usuario
const createUser = async (req, res) => {
  const {
    id_card,
    first_name,
    last_name,
    department,
    position,
    email,
    password,
    role,
    status,
    rank,
    photo,
    age,
    education,
  } = req.body;

  try {
    // Validar que los campos requeridos no estén vacíos
    if (!id_card || !first_name || !last_name || !email || !password || !role) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    // Encriptar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el usuario en la base de datos
    const result = await pool.query(
      `INSERT INTO users.users (id_card, first_name, last_name, department, position, email, password, role, status, rank, photo, age, education)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        id_card,
        first_name,
        last_name,
        department || null,
        position || null,
        email,
        hashedPassword,
        role,
        status || true,
        rank || 1, // Rango inicial "Junior"
        photo || null,
        age || null,
        education || null,
      ]
    );

    res.status(201).json({
      message: 'Usuario creado con éxito',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
};

module.exports = { createUser };

// *************************************************************************************************************************//
// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users.users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// *************************************************************************************************************************//
// Obtener todos los usuarios por cedula
const getUserByIdCard = async (req, res) => {
  const { id_card } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users.users WHERE id_card = $1', [id_card]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

// *************************************************************************************************************************//
// Actualizar el usuario por ID
const updateUserByIdCard = async (req, res) => {
  const { id_card } = req.params;
  const {
    first_name,
    last_name,
    department,
    position,
    email,
    password,
    role,
    status,
    rank,
    photo,
    age,
    education,
  } = req.body;

  try {
    // Validar si el usuario existe
    const userResult = await pool.query('SELECT * FROM users.users WHERE id_card = $1', [id_card]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Encriptar la contraseña si se envía
    let hashedPassword = userResult.rows[0].password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Validar valores opcionales y asignar null si están vacíos
    const updatedDepartment = department || null;
    const updatedPosition = position || null;
    const updatedPhoto = photo || null;
    const updatedAge = age || null;
    const updatedEducation = Array.isArray(education) ? education : education.split(',');

    // Actualizar el usuario
    const result = await pool.query(
      `UPDATE users.users
       SET first_name = $1, last_name = $2, department = $3, position = $4, email = $5, password = $6, role = $7, status = $8, rank = $9, photo = $10, age = $11, education = $12
       WHERE id_card = $13
       RETURNING *`,
      [
        first_name,
        last_name,
        updatedDepartment,
        updatedPosition,
        email,
        hashedPassword,
        role,
        status || true,
        rank || 1,
        updatedPhoto,
        updatedAge,
        updatedEducation,
        id_card,
      ]
    );

    res.status(200).json({
      message: 'Usuario actualizado con éxito',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};

// *************************************************************************************************************************//
// Desactivar un usuario por cédula
const deactivateUserByIdCard = async (req, res) => {
  const { id_card } = req.params;

  try {
    // Verificar si el usuario existe
    const userResult = await pool.query('SELECT * FROM users.users WHERE id_card = $1', [id_card]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Cambiar el estado a `false` (desactivado)
    const result = await pool.query(
      `UPDATE users.users
       SET status = false
       WHERE id_card = $1
       RETURNING *`,
      [id_card]
    );

    res.status(200).json({
      message: 'Usuario desactivado con éxito',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error al desactivar usuario:', error);
    res.status(500).json({ message: 'Error al desactivar usuario', error });
  }
};

const updateEducationUserByIdCard = async (req, res) => {
  const { id } = req.params; // Obtener el ID desde los parámetros
  const { education } = req.body; // Solo recibir el campo education desde el frontend

  try {
    // Validar que el campo educación no esté vacío
    if (!education) {
      return res.status(400).json({ message: "El campo educación es obligatorio." });
    }

    // Actualizar únicamente el campo education
    const result = await pool.query(
      "UPDATE users.users SET education = $1 WHERE id_users = $2 RETURNING *",
      [education, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({
      message: "Educación actualizada correctamente.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error en el servidor.", error });
  }
};

module.exports = { createUser, getUsers, updateUserByIdCard, getUserByIdCard, deactivateUserByIdCard, updateEducationUserByIdCard };

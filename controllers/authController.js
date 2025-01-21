const bcrypt = require('bcrypt');
const pool = require('../models/db'); // Conexión a la base de datos

// Validar credenciales
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar que se envíen los datos necesarios
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    // Buscar al usuario en la base de datos por correo electrónico
    const result = await pool.query('SELECT * FROM users.users WHERE email = $1', [email]);
    const user = result.rows[0];

    // Validar si el usuario existe
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la almacenada encriptada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas, devolver la información del usuario
    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id_card: user.id_card,
        first_name: user.first_name,
        last_name: user.last_name,
        department: user.department,
        position: user.position,
        email: user.email,
        role: user.role,
        status: user.status,
        rank: user.rank,
        photo: user.photo,
        age: user.age,
        education: user.education,
      },
    });
  } catch (err) {
    console.error('Error en loginUser:', err);
    res.status(500).json({ message: 'Error en el servidor', error: err });
  }
};

module.exports = { login };

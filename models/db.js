/*const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users_gesapp',
  password: '123456789',
  port: 5432,
  searchPath: ['users', 'public'],
});

module.exports = pool;*/

const { Pool } = require('pg');

// Cargar dotenv para las variables de entorno
require('dotenv').config();

// Validar si DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
    throw new Error('La variable de entorno DATABASE_URL no está definida. Verifica tu archivo .env.');
}

// Configurar conexión con la base de datos
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Permitir conexiones seguras sin verificar certificado
    },
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};

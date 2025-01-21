/*const pool = require('../models/db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa:', res.rows[0]);
  } catch (err) {
    console.error('Error de conexión:', err);
  } finally {
    pool.end();
  }
})();*/


const db = require('../models/db'); // Ruta relativa al archivo db.js

(async () => {
    try {
        const res = await db.query('SELECT NOW()');
        console.log('Conexión exitosa:', res.rows[0]);
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
})();
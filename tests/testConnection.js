const pool = require('../models/db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa:', res.rows[0]);
  } catch (err) {
    console.error('Error de conexión:', err);
  } finally {
    pool.end();
  }
})();

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users_gesapp',
  password: '123456789',
  port: 5432,
  searchPath: ['users', 'public'],
});

module.exports = pool;

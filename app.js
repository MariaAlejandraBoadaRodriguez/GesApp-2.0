const express = require('express');
const cors = require('cors'); // Importar cors
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const departmentRoutes  = require('./routes/department');
const rolesRoutes = require('./routes/roles');
const positionRoutes = require('./routes/position');
const entityRoutes = require('./routes/entity');
const experienceRoutes = require('./routes/experience');
const colombiaDRoutes = require('./routes/colombiaD');
const colombiaCRoutes = require('./routes/colombiaC');
const createbpRoutes = require('./routes/createbp');
const aprobarbpRoutes = require('./routes/createbp');
const getbpRoutes = require('./routes/createbp');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar CORS
const allowedOrigins = ['http://localhost:3002', 'https://tu-dominio-en-produccion.com'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/entity', entityRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/departments', colombiaDRoutes);
app.use('/api/city', colombiaCRoutes);
app.use('/api/createbp', createbpRoutes);
app.use('/api/aprobarbp',aprobarbpRoutes );
app.use('/api/getlessons', getbpRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

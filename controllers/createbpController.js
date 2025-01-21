const pool = require('../models/db'); // Conexión a la base de datos

// Crear registro en create_bp
const createExperience = async (req, res) => {
  const {
    cedula,
    fecha_diligenciamiento,
    nombre_experiencia,
    entidad_lider,
    tipo_experiencia,
    problema_necesidad,
    departamentos,
    municipios,
    periodo_inicio,
    periodo_fin,
    dirigida_a,
    objetivo,
    beneficios,
    numero_beneficiarios,
    metodologia,
    etapa_planeacion,
    etapa_ejecucion,
    etapa_evaluacion,
    material_elaborado,
    apoyo_recibido,
    fuentes_apoyo,
    montos_apoyo,
    validada,
    como_validada,
    reconocimiento,
    innovacion,
    utilidad,
    resultados,
    desafios,
    informacion_adicional,
    adjuntos,
  } = req.body;

  try {
    // Validar que los campos requeridos no estén vacíos
    if (!cedula || !fecha_diligenciamiento || !nombre_experiencia || !entidad_lider || !tipo_experiencia) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    // Insertar el registro en la base de datos
    const result = await pool.query(
      `INSERT INTO users.create_bp (
         cedula, fecha_diligenciamiento, nombre_experiencia, entidad_lider, tipo_experiencia, problema_necesidad, 
         departamentos, municipios, periodo_inicio, periodo_fin, dirigida_a, objetivo, beneficios, 
         numero_beneficiarios, metodologia, etapa_planeacion, etapa_ejecucion, etapa_evaluacion, 
         material_elaborado, apoyo_recibido, fuentes_apoyo, montos_apoyo, validada, como_validada, 
         reconocimiento, innovacion, utilidad, resultados, desafios, informacion_adicional, adjuntos
       ) VALUES (
         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 
         $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, 
         $25, $26, $27, $28, $29, $30, $31
       ) RETURNING *`,
      [
        cedula,
        fecha_diligenciamiento,
        nombre_experiencia,
        entidad_lider,
        tipo_experiencia,
        problema_necesidad,
        departamentos,
        municipios,
        periodo_inicio,
        periodo_fin,
        dirigida_a,
        objetivo,
        beneficios,
        numero_beneficiarios || null,
        metodologia || null,
        etapa_planeacion || null,
        etapa_ejecucion || null,
        etapa_evaluacion || null,
        material_elaborado || null,
        apoyo_recibido || false,
        fuentes_apoyo || null,
        montos_apoyo || 0.0,
        validada || false,
        como_validada || null,
        reconocimiento || false,
        innovacion || null,
        utilidad || null,
        resultados || null,
        desafios || null,
        informacion_adicional || null,
        adjuntos || null,
      ]
    );

    res.status(201).json({
      message: 'Experiencia creada con éxito',
      experiencia: result.rows[0],
    });
  } catch (error) {
    console.error('Error al crear experiencia:', error);
    res.status(500).json({ message: 'Error al crear experiencia', error });
  }
};


const getLessonsByCedula = async (req, res) => {
    const { cedula } = req.params; // La cédula viene como parámetro de la URL
  
    try {
      // Validar que la cédula esté presente
      if (!cedula) {
        return res.status(400).json({ message: 'Cédula es requerida' });
      }
  
      // Consulta a la base de datos
      const result = await pool.query(
        `SELECT * 
         FROM users.create_bp
         WHERE cedula = $1`,
        [cedula]
      );
  
      // Validar si hay resultados
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'No se encontraron lecciones aprendidas para esta cédula' });
      }
  
      // Responder con las lecciones aprendidas
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener las lecciones aprendidas:', error);
      res.status(500).json({ message: 'Error al obtener las lecciones aprendidas', error });
    }
};

// *************************************************************************************************************************//
// Ver Buena practica
const getLessons = async (req, res) => {
  try {
    // Consulta a la base de datos para obtener todas las buenas prácticas
    const result = await pool.query('SELECT * FROM users.create_bp');

    // Validar si hay resultados
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron buenas prácticas' });
    }

    // Responder con las buenas prácticas
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener las buenas prácticas:', error);
    res.status(500).json({ message: 'Error al obtener las buenas prácticas', error });
  }
};

// *************************************************************************************************************************//
// Activas Buena practica por id buena practica
const activateBuenaPractica = async (req, res) => {
  const { id_create_bp } = req.params;

  try {
    const userResult = await pool.query('SELECT * FROM users.create_bp WHERE id_create_bp = $1', [id_create_bp]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Buena Practica no encontrada' });
    }

    // Cambiar el estado a `True` (Activado)
    const result = await pool.query(
      `UPDATE users.create_bp
       SET activated = true
       WHERE id_create_bp = $1
       RETURNING *`,
      [id_create_bp]
    );

    res.status(200).json({
      message: 'Buena practica aprobada con éxito',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error al aprobar la buena practica:', error);
    res.status(500).json({ message: 'Error al aprobar la buena practica', error });
  }
};


module.exports = { createExperience, getLessonsByCedula, activateBuenaPractica, getLessons};

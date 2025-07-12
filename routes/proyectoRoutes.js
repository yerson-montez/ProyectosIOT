const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === 'imagen' ? 'uploads/imagenes' : 'uploads/informes';
    cb(null, path.join(__dirname, '..', folder));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + ext;
    cb(null, unique);
  }
});

const upload = multer({ storage: diskStorage });

router.get('/', proyectoController.listarProyectos);
router.get('/proyectos/subir', proyectoController.formularioSubida);
router.post('/proyectos/subir', upload.fields([{ name: 'imagen' }, { name: 'informe' }]), proyectoController.subirProyecto);
router.get('/proyectos/:id', proyectoController.verProyecto);

module.exports = router;

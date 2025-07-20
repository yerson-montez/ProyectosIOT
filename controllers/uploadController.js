const path = require('path');

const subirArchivo = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo.');
  }

  const tipo = req.params.tipo;
  const nombreArchivo = req.file.filename;

  res.send(`Archivo subido correctamente: /uploads/${tipo}/${nombreArchivo}`);
};

module.exports = { subirArchivo };

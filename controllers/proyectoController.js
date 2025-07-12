const Proyecto = require('../models/proyectoModel');
const path = require('path');
const fs = require('fs');

exports.listarProyectos = (req, res) => {
  Proyecto.getAll((err, results) => {
    if (err) return res.status(500).send('Error al listar proyectos');
    res.render('proyectos', { proyectos: results });
  });
};

exports.verProyecto = (req, res) => {
  Proyecto.getById(req.params.id, (err, results) => {
    if (err || results.length === 0) return res.status(404).send('Proyecto no encontrado');
    res.render('proyecto_detalle', { proyecto: results[0] });
  });
};

exports.formularioSubida = (req, res) => {
  res.render('subir');
};

exports.subirProyecto = (req, res) => {
  const imagen = req.files?.imagen?.[0]?.filename || '';
  const informe = req.files?.informe?.[0]?.filename || '';
  const { nombre, integrantes, descripcion } = req.body;

  const nuevoProyecto = { nombre, integrantes, descripcion, imagen, informe };

  Proyecto.create(nuevoProyecto, (err) => {
    if (err) return res.status(500).send('Error al guardar el proyecto');
    res.redirect('/');
  });
};

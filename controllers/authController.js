// controllers/authController.js
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

exports.registrar = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const hashedPassword = await bcrypt.hash(contrasena, 10);
  Usuario.crear(nombre, correo, hashedPassword, (err, result) => {
    if (err) return res.send('Error al registrar');
    res.redirect('/login');
  });
};

exports.iniciarSesion = (req, res) => {
  const { correo, contrasena } = req.body;
  Usuario.buscarPorCorreo(correo, async (err, results) => {
    if (err || results.length === 0) return res.send('Correo no encontrado');
    const usuario = results[0];
    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!coincide) return res.send('Contraseña incorrecta');
    // Guardar sesión
    req.session.usuarioId = usuario.id;
    res.redirect('/proyectos');
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

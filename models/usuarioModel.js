// models/usuarioModel.js
const db = require('../database/db');

const Usuario = {
  crear: (nombre, correo, contrasena, callback) => {
    const sql = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
    db.query(sql, [nombre, correo, contrasena], callback);
  },
  buscarPorCorreo: (correo, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(sql, [correo], callback);
  }
};

module.exports = Usuario;

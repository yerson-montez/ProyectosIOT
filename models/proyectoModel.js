const db = require('../database/db');

const Proyecto = {
  getAll: (cb) => {
    db.query('SELECT * FROM proyectos ORDER BY id DESC', cb);
  },
  getById: (id, cb) => {
    db.query('SELECT * FROM proyectos WHERE id = ?', [id], cb);
  },
  create: (data, cb) => {
    db.query('INSERT INTO proyectos SET ?', data, cb);
  }
};

module.exports = Proyecto;

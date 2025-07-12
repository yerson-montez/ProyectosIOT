const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes'); // ✅ Asegúrate que este archivo exista
const proyectoRoutes = require('./routes/proyectoRoutes');
const db = require('./database/db');

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));

// Archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Agregar rutas de autenticación antes de las otras rutas
app.use('/', authRoutes);

// Rutas de proyectos
app.use('/', proyectoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

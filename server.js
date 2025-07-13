const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const authRoutes = require('./routes/authRoutes'); // ✅ Asegúrate que exista este archivo
const proyectoRoutes = require('./routes/proyectoRoutes');
const db = require('./database/db');

dotenv.config();

// Configuración de la base de datos para sesiones (Clever Cloud)
const sessionDBOptions = {
  host: 'b1xlkbmpaoezy6hfkope-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uqgwdbj7tpvqfmo3',
  password: 'eMknQIeBP7XOltyeKT2a',
  database: 'b1xlkbmpaoezy6hfkope'
};

const sessionStore = new MySQLStore(sessionDBOptions);

// Middleware para parsear datos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de sesión con MySQL como almacenamiento
app.use(session({
  key: 'session_cookie_name',
  secret: 'tu_clave_secreta_segura',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true si usas HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 día
  }
}));

// Archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/', authRoutes);
app.use('/', proyectoRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

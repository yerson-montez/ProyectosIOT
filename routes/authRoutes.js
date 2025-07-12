// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.iniciarSesion);

router.get('/registro', (req, res) => res.render('registro'));
router.post('/registro', authController.registrar);

router.get('/logout', authController.logout);

module.exports = router;

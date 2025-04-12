const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//guia para cadastro
router.post('/register', userController.register);

//guia para login
router.post('/login', userController.login);

module.exports = router;

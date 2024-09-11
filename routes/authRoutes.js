// Importa o módulo Express
const express = require('express');

// Cria uma nova instância de Router, que permite criar rotas de forma modular
const router = express.Router();

// Importa o controlador de autenticação, que contém as funções de registro e login
const authController = require('../controllers/authController');

// Define uma rota POST para o endpoint '/register'
// Quando uma requisição for feita para '/register', a função 'register' do controlador será executada
router.post('/register', authController.register);

// Define uma rota POST para o endpoint '/login'
// Quando uma requisição for feita para '/login', a função 'login' do controlador será executada
router.post('/login', authController.login);

// Exporta o objeto 'router' para que possa ser utilizado em outras partes da aplicação
module.exports = router;

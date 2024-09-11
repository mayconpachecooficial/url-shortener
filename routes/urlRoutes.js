// Importa o módulo Express para lidar com rotas
const express = require('express');

// Cria uma instância do Router, permitindo a criação de rotas específicas
const router = express.Router();

// Importa o controlador de URLs, que contém a lógica para manipular URLs encurtadas
const urlController = require('../controllers/urlController');

// Importa o middleware de autenticação para proteger rotas específicas
const authMiddleware = require('../middleware/authMiddleware');

// Rota para encurtar uma nova URL (POST /shorten)
// Esta rota chama o método 'shortenUrl' do controlador sem necessidade de autenticação
router.post('/shorten', urlController.shortenUrl);

// Rota para listar todas as URLs do usuário logado (GET /urls)
// Middleware de autenticação é aplicado para garantir que o usuário esteja logado antes de acessar essa rota
router.get('/urls', authMiddleware, urlController.listUrls);

// Rota para atualizar uma URL existente (PUT /urls/:id)
// Requer autenticação, e o método 'updateUrl' do controlador é chamado com base no ID da URL
router.put('/urls/:id', authMiddleware, urlController.updateUrl);

// Rota para excluir uma URL (DELETE /urls/:id)
// Também protegida por autenticação, a função 'deleteUrl' do controlador é chamada para marcar a URL como excluída
router.delete('/urls/:id', authMiddleware, urlController.deleteUrl);

// Rota para redirecionar o usuário para a URL original (GET /:shortened_url)
// Essa rota pega a URL encurtada e redireciona para a URL original sem necessidade de autenticação
router.get('/:shortened_url', urlController.redirectUrl);

// Exporta o router para ser utilizado em outras partes da aplicação
module.exports = router;

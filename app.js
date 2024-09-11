// Importa o módulo Express para criar o servidor web
const express = require('express');

// Cria uma nova instância da aplicação Express
const app = express();

// Importa o módulo dotenv para carregar variáveis de ambiente a partir do arquivo .env
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Importa as rotas de autenticação e URLs
const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');

// Configura o middleware para analisar o corpo das requisições em formato JSON
app.use(express.json());

// Configura as rotas de autenticação para o prefixo '/api/auth'
app.use('/api/auth', authRoutes);

// Configura as rotas de URL para o prefixo '/api'
app.use('/api', urlRoutes);

// Define a porta em que o servidor irá escutar, com fallback para 3000 se a variável de ambiente PORT não estiver definida
const PORT = process.env.PORT || 3000;

// Inicia o servidor e faz com que ele escute na porta definida
app.listen(PORT, () => {
    // Loga uma mensagem no console indicando que o servidor está rodando e em qual porta
    console.log(`Servidor rodando na porta ${PORT}`);
});

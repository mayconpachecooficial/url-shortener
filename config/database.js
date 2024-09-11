// Importando o Sequelize, ORM que ajuda a interagir com o banco de dados de forma mais simples e estruturada
const { Sequelize } = require('sequelize');

// Inicializando uma nova instância do Sequelize com as credenciais do banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME,          // Nome do banco de dados (pegando da variável de ambiente)
  process.env.DB_USER,          // Usuário do banco de dados (pegando da variável de ambiente)
  process.env.DB_PASSWORD,      // Senha do banco de dados (pegando da variável de ambiente)
  {
    // Host onde o banco está rodando, também vindo da variável de ambiente
    host: process.env.DB_HOST,

    // Definindo o tipo de banco de dados, nesse caso MySQL
    dialect: 'mysql',

    // Desativando logs de SQL no console, para manter o terminal limpo (pode ser útil em produção)
    logging: false
  }
);

// Exportando a instância do Sequelize para ser usada nas outras partes do app
module.exports = sequelize;

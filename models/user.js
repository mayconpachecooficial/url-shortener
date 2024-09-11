// Importa os tipos de dados do Sequelize
const { DataTypes } = require('sequelize');

// Importa a instância do Sequelize configurada (conexão com o banco de dados)
const sequelize = require('../config/database'); 

// Define o modelo "User" que corresponde à tabela 'users' no banco de dados
const User = sequelize.define('User', {
  // Coluna 'id' que será o identificador único do usuário
  id: {
    type: DataTypes.INTEGER,          // Define o tipo INTEGER para o ID do usuário
    autoIncrement: true,              // Configura o campo para incrementar automaticamente
    primaryKey: true                  // Define que esse campo será a chave primária da tabela
  },
  // Coluna 'email' para armazenar o e-mail do usuário
  email: {
    type: DataTypes.STRING,           // Define o tipo STRING para armazenar o e-mail
    allowNull: false,                 // Campo obrigatório (não pode ser nulo)
    unique: true                      // Garante que o e-mail seja único na tabela
  },
  // Coluna 'password' para armazenar a senha do usuário
  password: {
    type: DataTypes.STRING,           // Define o tipo STRING para a senha (hash da senha será salvo aqui)
    allowNull: false                  // Campo obrigatório (não pode ser nulo)
  },
  // Coluna 'createdAt' para armazenar a data e hora de criação do usuário
  createdAt: {
    type: DataTypes.DATE,             // Define o tipo DATE para armazenar a data de criação
    defaultValue: DataTypes.NOW       // Define o valor padrão como a data e hora atuais
  },
  // Coluna 'updatedAt' para armazenar a data e hora de atualização do registro
  updatedAt: {
    type: DataTypes.DATE,             // Define o tipo DATE para armazenar a data de atualização
    defaultValue: DataTypes.NOW       // Define o valor padrão como a data e hora atuais
  }
}, {
  // Define o nome da tabela no banco de dados como 'users'
  tableName: 'users',
  
  // Habilita automaticamente as colunas 'createdAt' e 'updatedAt'
  timestamps: true,
  
  // Habilita exclusão lógica (soft delete), adicionando a coluna 'deletedAt'
  paranoid: true
});

// Exporta o modelo 'User' para ser utilizado em outras partes da aplicação
module.exports = User;

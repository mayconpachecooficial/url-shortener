// Importa os tipos de dados do Sequelize
const { DataTypes } = require('sequelize');

// Importa a instância do Sequelize configurada (conexão com o banco de dados)
const sequelize = require('../config/database');

// Define o modelo "Url" que corresponde à tabela 'urls' no banco de dados
const Url = sequelize.define('Url', {
    // Coluna 'original_url' que armazena o URL original
    originalUrl: {
        type: DataTypes.STRING(2048),  // Define o tipo STRING com limite de até 2048 caracteres
        allowNull: false,              // Campo obrigatório (não pode ser nulo)
        field: 'original_url'          // Mapeia para a coluna 'original_url' no banco de dados
    },
    // Coluna 'shortened_url' que armazena o URL encurtado
    shortenedUrl: {
        type: DataTypes.STRING(10),    // Define o tipo STRING com limite de 10 caracteres
        allowNull: false,              // Campo obrigatório (não pode ser nulo)
        field: 'shortened_url'         // Mapeia para a coluna 'shortened_url' no banco de dados
    },
    // Coluna 'user_id' que armazena o ID do usuário relacionado ao URL
    userId: {
        type: DataTypes.INTEGER,       // Define o tipo INTEGER (número inteiro)
        field: 'user_id'               // Mapeia para a coluna 'user_id' no banco de dados
    },
    // Coluna 'deleted_at' que armazena a data de exclusão lógica
    deletedAt: {
        type: DataTypes.DATE,          // Define o tipo DATE para armazenar a data e hora da exclusão
        field: 'deleted_at'            // Mapeia para a coluna 'deleted_at' no banco de dados
    }
}, {
    timestamps: true,                  // Habilita automaticamente as colunas 'createdAt' e 'updatedAt'
    paranoid: true,                    // Habilita a exclusão lógica (soft delete), em vez de remover o registro, define 'deletedAt'
    tableName: 'urls'                  // Especifica o nome da tabela no banco de dados como 'urls'
});

// Exporta o modelo 'Url' para ser utilizado em outras partes da aplicação
module.exports = Url;

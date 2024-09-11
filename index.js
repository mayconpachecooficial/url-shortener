// Importa a instância do Sequelize configurada para conectar ao banco de dados
const sequelize = require('./config/database');

// Importa os modelos User e Url definidos para a aplicação
const User = require('./models/user');
const Url = require('./models/url');

// Função assíncrona para sincronizar o banco de dados
async function syncDatabase() {
  try {
    // Sincroniza os modelos com o banco de dados
    // 'alter: true' faz com que o Sequelize altere o banco de dados para refletir as mudanças nos modelos, sem apagar dados existentes
    await sequelize.sync({ alter: true }); 
    
    // Mensagem no console para confirmar que a sincronização foi bem-sucedida
    console.log('Database synced');
  } catch (error) {
    // Em caso de erro durante a sincronização, imprime a mensagem de erro no console
    console.error('Error syncing database:', error);
  }
}

// Chama a função de sincronização para atualizar o banco de dados de acordo com os modelos
syncDatabase();

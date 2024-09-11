const sequelize = require('./config/database');
const User = require('./models/user');
const Url = require('./models/url');

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // Cria as tabelas e ajusta a estrutura conforme necessário
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

syncDatabase();

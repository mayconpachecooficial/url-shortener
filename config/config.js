// Importando a lib mysql2 para interagir com o banco de dados MySQL
const mysql = require('mysql2');

// Criando um pool de conexões para otimizar a performance e gerenciar várias conexões simultâneas
const pool = mysql.createPool({
  // Host do banco de dados, puxando o valor da variável de ambiente
  host: process.env.DB_HOST,

  // Usuário do banco de dados, configurado via variável de ambiente
  user: process.env.DB_USER,

  // Senha do banco, também vindo da variável de ambiente
  password: process.env.DB_PASSWORD,

  // Nome do banco de dados, definido via variável de ambiente
  database: process.env.DB_NAME,

  // Permite que o pool aguarde por novas conexões quando estiver cheio
  waitForConnections: true,

  // Limite máximo de conexões simultâneas no pool (definido para 10 aqui)
  connectionLimit: 10,

  // Limite de requisições na fila; 0 significa que não há limite
  queueLimit: 0
});

// Exportando o pool de conexões com suporte a Promises para facilitar o uso com async/await
module.exports = pool.promise();

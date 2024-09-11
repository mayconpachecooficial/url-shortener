// Importando o JWT para criação e verificação de tokens de autenticação
const jwt = require('jsonwebtoken');

// Importando o bcryptjs para hash e verificação de senhas
const bcrypt = require('bcryptjs');

// Importando o pool de conexões ao banco de dados
const pool = require('../config/config');

// Função de registro de novo usuário
exports.register = async (req, res) => {
    const { email, password } = req.body; // Pega o e-mail e senha do corpo da requisição
    try {
        // Faz o hash da senha com um salt de 10 rounds para segurança
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere o novo usuário no banco de dados, salvando o e-mail e a senha hash
        await pool.query('INSERT INTO Users (email, password_hash) VALUES (?, ?)', [email, hashedPassword]);

        // Retorna sucesso se tudo der certo
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (err) {
        // Retorna erro 500 (interno do servidor) se algo falhar no processo
        res.status(500).json({ error: err.message });
    }
};

// Função de login do usuário
exports.login = async (req, res) => {
    const { email, password } = req.body; // Pega o e-mail e senha do corpo da requisição
    try {
        // Busca o usuário pelo e-mail no banco de dados
        const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);

        // Se não encontrar o usuário, retorna erro de autenticação
        if (rows.length === 0) return res.status(401).json({ message: 'E-mail ou Senha inválidos!' });

        const user = rows[0]; // Usuário encontrado

        // Verifica se a senha inserida corresponde ao hash armazenado no banco
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).json({ message: 'E-mail ou Senha inválidos!' });

        // Gera um token JWT com o ID do usuário, válido por 1 hora
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token para o cliente
        res.json({ token });
    } catch (err) {
        // Retorna erro 500 (interno do servidor) se algo falhar
        res.status(500).json({ error: err.message });
    }
};

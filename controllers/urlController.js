// Importando o JWT para lidar com autenticação
const jwt = require('jsonwebtoken');

// Importando o pool de conexões para interagir com o banco de dados
const pool = require('../config/config');

// Importando função para gerar URLs encurtadas
const generateShortUrl = require('../utils/generateShortUrl');

// Função para encurtar URL
exports.shortenUrl = async (req, res) => {
    // Extraindo a URL original enviada pelo corpo da requisição
    const { original_url } = req.body;

    // Pega o userId do token JWT, se estiver presente (usuário logado), ou null (usuário anônimo)
    const userId = req.userId || null;

    // Gerando uma string curta para a URL encurtada
    const shortened_url = generateShortUrl();

    try {
        // Insere no banco de dados a URL original, a URL encurtada e o ID do usuário (se houver)
        await pool.query('INSERT INTO Urls (user_id, original_url, shortened_url) VALUES (?, ?, ?)', [userId, original_url, shortened_url]);

        // Retorna a URL encurtada gerada
        res.json({ shortened_url: `http://localhost/${shortened_url}` });
    } catch (err) {
        // Se houver erro, responde com o status 500 e a mensagem do erro
        res.status(500).json({ error: err.message });
    }
};

// Função para listar todas as URLs encurtadas de um usuário
exports.listUrls = async (req, res) => {
    const userId = req.userId; // Obtém o ID do usuário autenticado

    try {
        // Consulta todas as URLs não deletadas (deleted_at é null) pertencentes ao usuário
        const [rows] = await pool.query('SELECT * FROM Urls WHERE user_id = ? AND deleted_at IS NULL', [userId]);

        // Retorna a lista de URLs
        res.json(rows);
    } catch (err) {
        // Se houver erro, responde com o status 500 e a mensagem do erro
        res.status(500).json({ error: err.message });
    }
};

// Função para atualizar uma URL encurtada
exports.updateUrl = async (req, res) => {
    const { id } = req.params; // Obtém o ID da URL via parâmetros da rota
    const { original_url } = req.body; // Pega a URL original nova enviada no corpo da requisição

    try {
        // Atualiza a URL original no banco de dados e registra a data de atualização (updated_at)
        await pool.query('UPDATE Urls SET original_url = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL', [original_url, id]);

        // Retorna mensagem de sucesso
        res.json({ message: 'URL atualizada com sucesso!' });
    } catch (err) {
        // Se houver erro, responde com o status 500 e a mensagem do erro
        res.status(500).json({ error: err.message });
    }
};

// Função para deletar (soft delete) uma URL encurtada
exports.deleteUrl = async (req, res) => {
    const { id } = req.params; // Obtém o ID da URL via parâmetros da rota

    try {
        // Marca a URL como deletada ao definir a coluna deleted_at como a data atual
        await pool.query('UPDATE Urls SET deleted_at = NOW() WHERE id = ?', [id]);

        // Retorna mensagem de sucesso
        res.json({ message: 'URL deletada com sucesso!' });
    } catch (err) {
        // Se houver erro, responde com o status 500 e a mensagem do erro
        res.status(500).json({ error: err.message });
    }
};

// Função para redirecionar para a URL original a partir da URL encurtada
exports.redirectUrl = async (req, res) => {
    const { shortened_url } = req.params; // Obtém a URL encurtada via parâmetros da rota

    try {
        // Consulta a URL encurtada no banco de dados, desde que ela não tenha sido deletada (deleted_at IS NULL)
        const [rows] = await pool.query('SELECT * FROM Urls WHERE shortened_url = ? AND deleted_at IS NULL', [shortened_url]);

        // Se não encontrar a URL, retorna um erro 404
        if (rows.length === 0) return res.status(404).json({ message: 'URL não existe!' });

        const url = rows[0]; // Pega a primeira (e única) URL encontrada

        // Incrementa o contador de cliques da URL no banco de dados
        await pool.query('UPDATE Urls SET click_count = click_count + 1 WHERE id = ?', [url.id]);

        // Redireciona para a URL original
        res.redirect(url.original_url);
    } catch (err) {
        // Se houver erro, responde com o status 500 e a mensagem do erro
        res.status(500).json({ error: err.message });
    }
};

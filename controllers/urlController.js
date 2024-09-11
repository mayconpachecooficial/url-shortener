const jwt = require('jsonwebtoken');
const pool = require('../config/config');
const generateShortUrl = require('../utils/generateShortUrl');

exports.shortenUrl = async (req, res) => {
    const { original_url } = req.body;
    const userId = req.userId || null;
    const shortened_url = generateShortUrl();

    try {
        await pool.query('INSERT INTO Urls (user_id, original_url, shortened_url) VALUES (?, ?, ?)', [userId, original_url, shortened_url]);
        res.json({ shortened_url: `http://localhost/${shortened_url}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listUrls = async (req, res) => {
    const userId = req.userId;
    try {
        const [rows] = await pool.query('SELECT * FROM Urls WHERE user_id = ? AND deleted_at IS NULL', [userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUrl = async (req, res) => {
    const { id } = req.params;
    const { original_url } = req.body;
    try {
        await pool.query('UPDATE Urls SET original_url = ?, updated_at = NOW() WHERE id = ? AND deleted_at IS NULL', [original_url, id]);
        res.json({ message: 'URL atualizada com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUrl = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE Urls SET deleted_at = NOW() WHERE id = ?', [id]);
        res.json({ message: 'URL deletada com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.redirectUrl = async (req, res) => {
    const { shortened_url } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Urls WHERE shortened_url = ? AND deleted_at IS NULL', [shortened_url]);
        if (rows.length === 0) return res.status(404).json({ message: 'URL não existe!' });

        const url = rows[0];
        await pool.query('UPDATE Urls SET click_count = click_count + 1 WHERE id = ?', [url.id]);
        res.redirect(url.original_url);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

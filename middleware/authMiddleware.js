// Importa a biblioteca JWT para trabalhar com tokens JSON Web Tokens
const jwt = require('jsonwebtoken');

// Middleware para autenticação via JWT
module.exports = (req, res, next) => {
    // Extrai o token da requisição, assumindo que ele vem no cabeçalho 'Authorization' no formato 'Bearer <token>'
    const token = req.headers['authorization']?.split(' ')[1];

    // Se não houver token no cabeçalho, retorna um erro 401 (Não autorizado)
    if (!token) return res.status(401).json({ message: 'Nenhum token fornecido!' });

    // Verifica a validade do token usando o segredo armazenado nas variáveis de ambiente (JWT_SECRET)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // Se o token for inválido ou expirar, retorna um erro 403 (Proibido)
        if (err) return res.status(403).json({ message: 'Token inválido!' });

        // Se o token for válido, decodifica o userId do payload e armazena no objeto req, tornando-o acessível para as próximas rotas
        req.userId = decoded.userId;

        // Chama o próximo middleware ou rota da pilha
        next();
    });
};

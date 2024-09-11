// Importa o módulo 'crypto' para gerar valores criptograficamente seguros
const crypto = require('crypto');

// Função para gerar uma URL encurtada única
const generateShortUrl = () => {
    // Gera 3 bytes de dados aleatórios e os codifica em uma string usando base64 URL-safe
    // O método 'randomBytes' é usado para criar um buffer de bytes aleatórios
    // 'toString('base64url')' converte o buffer para uma string base64 URL-safe
    // 'slice(0, 6)' pega apenas os primeiros 6 caracteres da string gerada para usar como a URL encurtada
    return crypto.randomBytes(3).toString('base64url').slice(0, 6);
};

// Exporta a função para que possa ser utilizada em outras partes da aplicação
module.exports = generateShortUrl;

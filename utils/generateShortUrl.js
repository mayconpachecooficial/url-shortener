const crypto = require('crypto');

const generateShortUrl = () => {
    return crypto.randomBytes(3).toString('base64url').slice(0, 6);
};

module.exports = generateShortUrl;

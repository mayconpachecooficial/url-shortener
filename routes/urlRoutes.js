const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/shorten', urlController.shortenUrl);
router.get('/urls', authMiddleware, urlController.listUrls);
router.put('/urls/:id', authMiddleware, urlController.updateUrl);
router.delete('/urls/:id', authMiddleware, urlController.deleteUrl);
router.get('/:shortened_url', urlController.redirectUrl);

module.exports = router;

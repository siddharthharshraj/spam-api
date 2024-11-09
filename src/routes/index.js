const express = require('express');
const authController = require('../controllers/authController');
const contactController = require('../controllers/contactController');
const spamController = require('../controllers/spamController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Authentication
router.post('/register', authController.register);
router.post('/login', authController.login);

// Contacts
router.post('/contacts', authenticate, contactController.addContact);
router.get('/search/name', authenticate, contactController.searchByName);
router.get('/search/phone', authenticate, contactController.searchByPhone);

// Spam
router.post('/spam', authenticate, spamController.markSpam);

module.exports = router;

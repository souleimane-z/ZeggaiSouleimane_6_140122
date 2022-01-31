const express = require('express');
const router = express.Router();
const checkEmail = require('../middleware/email-validator');
const checkPassword = require('../middleware/password-validator');
const limit = require('../middleware/limiter');
const userCtrl = require('../controllers/user');

// ROUTES
router.post('/signup', checkEmail, checkPassword, userCtrl.signup);
router.post('/login', limit.limiter, userCtrl.login);

// EXPORT
module.exports = router;
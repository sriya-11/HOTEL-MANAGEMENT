

const express = require('express');
const router = express.Router();
const { registerCustomer, loginCustomer } = require('../controllers/authController');

// These functions must be correctly exported in authController.js
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);

module.exports = router;

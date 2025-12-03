const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { body } = require('express-validator');

// Login
router.post(
    '/login',
    [body('username').isAlphanumeric(), body('password').isString()],
    AuthController.login
);

// Criar usuário
router.post(
    '/create',
    [
        body('username').isAlphanumeric(),
        body('password').isString(),
        body('name').isString(),
        body('type').isString(),
        body('birth_date').isISO8601(),
        body('description').optional().isString(),
        body('location').optional().custom(value => {
            if (typeof value !== 'object' || Array.isArray(value)) {
                throw new Error('location precisa ser um objeto');
            }
            return true;
        })
    ],
    AuthController.createUser
);

module.exports = router;


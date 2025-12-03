const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const AnimalController = require('../controllers/animal.controller');
const AuthController = require("../controllers/auth.controller");
const CONFIG = require("../config/config");

// VALIDAÇÕES
const animalValidation = [
    body('name').isString().trim(),
    body('group').isString().trim(),
    body('description')
        .isString()
        .trim()
        .matches(new RegExp(`^[${CONFIG.sanitize.alphabet}${CONFIG.sanitize.numerical}]+$`))
        .withMessage("Descrição contém caracteres inválidos"),

    body('level').isInt(),

    body('links.*.types').isString().trim().isAlpha(),
    body('links.*.url').isURL()
];

// ROTAS
router.route('/')
    .get(AuthController.checkAuth, AnimalController.get)
    .post(AuthController.checkAuth, animalValidation, AnimalController.create);

router.route('/:id')
    .get(AuthController.checkAuth, param("id").isMongoId(), AnimalController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId(), ...animalValidation], AnimalController.update)
    .delete(AuthController.checkAuth, param("id").isMongoId(), AnimalController.delete);

router.put("/activate/:id",
    AuthController.checkAuth,
    param("id").isMongoId(),
    AnimalController.activate
);

router.put("/deactivate/:id",
    AuthController.checkAuth,
    param("id").isMongoId(),
    AnimalController.deactivate
);

module.exports = router;

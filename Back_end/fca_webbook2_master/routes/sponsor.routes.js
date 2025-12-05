const express = require("express");
const router = express.Router();
const SponsorController = require("../controllers/sponsor.controller");

// Se usas validações, importa-as aqui
const { body, param } = require("express-validator");

/* -----------------------------------------
   ROTAS DE SPONSORS
------------------------------------------ */

// GET all sponsors
router.get(
    "/",
    SponsorController.get
);

// GET one sponsor
router.get(
    "/:id",
    [
        param("id").isMongoId().withMessage("ID inválido")
    ],
    SponsorController.getOne
);

// CREATE sponsor
router.post(
    "/",
    [
        body("nome").not().isEmpty().withMessage("O nome é obrigatório"),
        body("localizacao").not().isEmpty().withMessage("A localização é obrigatória"),
        body("website").optional().isURL().withMessage("Website inválido"),
        body("contacto").optional().isString().withMessage("Contacto inválido")
    ],
    SponsorController.create
);

// UPDATE sponsor
router.put(
    "/:id",
    [
        param("id").isMongoId().withMessage("ID inválido")
    ],
    SponsorController.update
);

// DELETE sponsor
router.delete(
    "/:id",
    [
        param("id").isMongoId().withMessage("ID inválido")
    ],
    SponsorController.delete
);

// ACTIVATE sponsor
router.put(
    "/activate/:id",
    [
        param("id").isMongoId().withMessage("ID inválido")
    ],
    SponsorController.activate
);

// DEACTIVATE sponsor
router.put(
    "/deactivate/:id",
    [
        param("id").isMongoId().withMessage("ID inválido")
    ],
    SponsorController.deactivate
);

module.exports = router;


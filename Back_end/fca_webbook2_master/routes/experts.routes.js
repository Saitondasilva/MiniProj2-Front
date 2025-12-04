const express = require("express");
const router = express.Router();
const ExpertsController = require("../controllers/experts.controller");

// Se usas validações, importa-as aqui
const { body, param, query } = require("express-validator");

/* -----------------------------------------
   ROTAS DE EXPERTS
------------------------------------------ */

// GET all experts
router.get(
    "/",
    ExpertsController.get
);

// GET one expert
router.get(
    "/:id",
    [
        param("id").isMongoId().withMessage("ID inválido")
    ],
    ExpertsController.getOne
);

// CREATE expert
router.post(
    "/",
    [
        body("nome").not().isEmpty().withMessage("O nome é obrigatório"),
        body("especialidade").not().isEmpty().withMessage("A especialidade é obrigatória"),
        body("titulo_academico").not().isEmpty().withMessage("O título académico é obrigatório")
    ],
    ExpertsController.create
);


// UPDATE expert
router.put(
    "/:id",
    [
        param("id").isMongoId().withMessage("ID inválido")
    ],
    ExpertsController.update
);

// DELETE expert
router.delete(
    "/:id",
    [
        param("id").isMongoId().withMessage("ID inválido")
    ],
    ExpertsController.delete
);

// ACTIVATE expert
router.put(
    "/activate/:id",
    [
        param("id").isMongoId().withMessage("ID inválido")
    ],
    ExpertsController.activate
);

// DEACTIVATE expert
router.put(
    "/deactivate/:id",
    [
        param("id").isMongoId().withMessage("ID inválido")
    ],
    ExpertsController.deactivate
);

module.exports = router;

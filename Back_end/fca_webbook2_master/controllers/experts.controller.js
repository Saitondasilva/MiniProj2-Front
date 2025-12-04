const experts = require('../models/experts.model');
const { validationResult } = require('express-validator');
const ExpertsMessages = require("../messages/experts.messages");

// =======================
// GET ALL
// =======================
exports.get = (req, res) => {
    experts.find(req.query).exec((error, data) => {
        if (error) throw error;

        let message = ExpertsMessages.success.s2;

        if (data.length === 0)
            message = ExpertsMessages.success.s5;

        message.body = data;
        return res.status(message.http).send(message);
    });
}

// =======================
// GET ONE
// =======================
exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    experts.findOne({ _id: req.params.id })
        .exec((error, expert) => {
            if (error) throw error;

            if (!expert)
                return res.status(ExpertsMessages.error.e0.http).send(ExpertsMessages.error.e0);

            let message = ExpertsMessages.success.s2;
            message.body = expert;

            return res.status(message.http).send(message);
        });
}

// =======================
// CREATE
// =======================
exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new experts({
        nome: req.body.nome,
        especialidade: req.body.especialidade,
        titulo_academico: req.body.titulo_academico,
        questions: [] // vazio por padrão
    }).save((error, expert) => {
        if (error) throw error;

        let message = ExpertsMessages.success.s0;
        message.body = expert;

        return res
            .header("location", "/experts/" + expert._id)
            .status(message.http)
            .send(message);
    });
}

// =======================
// UPDATE
// =======================
exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    experts.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
        (error, expert) => {
            if (error) throw error;

            if (!expert)
                return res.status(ExpertsMessages.error.e0.http).send(ExpertsMessages.error.e0);

            let message = ExpertsMessages.success.s1;
            message.body = expert;

            return res.status(message.http).send(message);
        }
    );
}

// =======================
// DELETE
// =======================
exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    experts.deleteOne({ _id: req.params.id }, (error, result) => {
        if (error) throw error;

        if (result.deletedCount <= 0)
            return res.status(ExpertsMessages.error.e0.http).send(ExpertsMessages.error.e0);

        return res.status(ExpertsMessages.success.s3.http).send(ExpertsMessages.success.s3);
    });
}

// =======================
// ACTIVATE
// =======================
exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    experts.updateOne(
        { _id: req.params.id },
        { $set: { active: true } },
        (error, result) => {
            if (error) throw error;

            if (result.n <= 0)
                return res.status(ExpertsMessages.error.e0.http).send(ExpertsMessages.error.e0);

            return res.status(ExpertsMessages.success.s6.http).send(ExpertsMessages.success.s6);
        }
    );
}

// =======================
// DEACTIVATE
// =======================
exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    experts.updateOne(
        { _id: req.params.id },
        { $set: { active: false } },
        (error, result) => {
            if (error) throw error;

            if (result.n <= 0)
                return res.status(ExpertsMessages.error.e0.http).send(ExpertsMessages.error.e0);

            return res.status(ExpertsMessages.success.s4.http).send(ExpertsMessages.success.s4);
        }
    );
}

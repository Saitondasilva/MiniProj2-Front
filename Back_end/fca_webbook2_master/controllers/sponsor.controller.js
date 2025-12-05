const Sponsor = require('../models/sponsor.model');
const { validationResult } = require('express-validator');
const SponsorMessages = require("../messages/sponsor.messages");

// =======================
// GET ALL
// =======================
exports.get = (req, res) => {
    Sponsor.find(req.query).exec((error, sponsors) => {
        if (error) throw error;

        let message = SponsorMessages.success.s2;

        if (sponsors.length === 0)
            message = SponsorMessages.success.s5;

        message.body = sponsors;
        return res.status(message.http).send(message);
    });
}

// =======================
// GET ONE
// =======================
exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.findOne({ _id: req.params.id })
        .exec((error, sponsor) => {
            if (error) throw error;

            if (!sponsor)
                return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);

            let message = SponsorMessages.success.s2;
            message.body = sponsor;

            return res.status(message.http).send(message);
        });
}

// =======================
// CREATE
// =======================
exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Sponsor({
        nome: req.body.nome,
        localizacao: req.body.localizacao,
        website: req.body.website,
        contacto: req.body.contacto,
        active: true // por padrão ativo
    }).save((error, sponsor) => {
        if (error) throw error;

        let message = SponsorMessages.success.s0;
        message.body = sponsor;

        return res
            .header("location", "/sponsors/" + sponsor._id)
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

    Sponsor.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
        (error, sponsor) => {
            if (error) throw error;

            if (!sponsor)
                return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);

            let message = SponsorMessages.success.s1;
            message.body = sponsor;

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

    Sponsor.deleteOne({ _id: req.params.id }, (error, result) => {
        if (error) throw error;

        if (result.deletedCount <= 0)
            return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);

        return res.status(SponsorMessages.success.s3.http).send(SponsorMessages.success.s3);
    });
}

// =======================
// ACTIVATE
// =======================
exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.updateOne(
        { _id: req.params.id },
        { $set: { active: true } },
        (error, result) => {
            if (error) throw error;

            if (result.n <= 0)
                return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);

            return res.status(SponsorMessages.success.s6.http).send(SponsorMessages.success.s6);
        }
    );
}

// =======================
// DEACTIVATE
// =======================
exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.updateOne(
        { _id: req.params.id },
        { $set: { active: false } },
        (error, result) => {
            if (error) throw error;

            if (result.n <= 0)
                return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);

            return res.status(SponsorMessages.success.s4.http).send(SponsorMessages.success.s4);
        }
    );
}


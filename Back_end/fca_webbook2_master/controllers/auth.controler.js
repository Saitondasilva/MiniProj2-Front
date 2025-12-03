const User = require('../models/auth.model');
const { validationResult } = require('express-validator');
const AuthMessages = require("../messages/auth.messages");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const CONFIG = require("../config/config");

/**
 * Retorna informações do usuário autenticado
 */
exports.getInfo = (req, res) => {
    let message = AuthMessages.success.s1 || { http: 200, body: {} };
    message.body = req.user;
    return res.status(message.http).send(message);
};

/**
 * Login do usuário
 */
exports.login = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    const { username, password } = req.body;

    User.findOne({ "auth.username": username }, (error, user) => {
        if (error) return res.status(500).send({ error: "Erro no servidor" });

        if (!user || !bcrypt.compareSync(password, user.auth.password))
            return res.header("Authorization", null)
                      .status(AuthMessages.error.e0.http)
                      .send(AuthMessages.error.e0);

        const payload = { pk: user.auth.public_key };
        const options = {
            expiresIn: CONFIG.auth.expiration_time,
            issuer: CONFIG.auth.issuer
        };

        const token = JWT.sign(payload, user.auth.private_key, options);

        let message = AuthMessages.success.s0 || { http: 200, body: {} };
        message.body = user;

        return res.header("Authorization", token)
                  .status(message.http)
                  .send(message);
    });
};

/**
 * Middleware para checar autenticação via JWT
 */
exports.checkAuth = (req, res, callback) => {
    const token = req.headers.authorization;
    if (!token) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

    let payload;
    try {
        payload = JWT.decode(token);
        if (!payload || !payload.pk) {
            return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);
        }
    } catch {
        return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);
    }

    User.findOne({ "auth.public_key": payload.pk }, (error, user) => {
        if (error) return res.status(500).send({ error: "Erro no servidor" });
        if (!user) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

        JWT.verify(token, user.auth.private_key, (error) => {
            if (error) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

            req.user = user;
            return callback();
        });
    });
};

/**
 * Criação de novo usuário
 */
exports.createUser = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    const { username, password, name, type, birth_date, description, location } = req.body;

    // Verifica se usuário já existe
    User.findOne({ "auth.username": username }, (err, existingUser) => {
        if (err) return res.status(500).send({ error: "Erro ao verificar usuário" });
        if (existingUser) return res.status(409).send({ error: "Usuário já existe" });

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            auth: {
                username,
                password: hashedPassword,
                public_key: Math.random().toString(36).substring(2, 15),
                private_key: Math.random().toString(36).substring(2, 15)
            },
            name,
            type,
            birth_date,
            description,
            location
        });

        newUser.save((err, user) => {
            if (err) return res.status(500).send({ error: "Erro ao criar usuário" });

            let message = AuthMessages.success.s2 || { http: 201, body: "Usuário criado com sucesso" };
            message.body = user;

            return res.status(message.http).send(message);
        });
    });
};

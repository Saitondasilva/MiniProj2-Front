const User = require('../models/auth.model');
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const CONFIG = require("../config/config");
const crypto = require("crypto");

/**
 * Retorna informações do usuário autenticado
 */
exports.getInfo = async (req, res) => {
    try {
        // Remover dados sensíveis
        const userSafe = { ...req.user._doc };
        delete userSafe.auth.password;
        delete userSafe.auth.private_key;

        return res.status(200).send(userSafe);
    } catch (err) {
        return res.status(500).send({ code: "ServerError", type: "error" });
    }
};

/**
 * Login do usuário
 */
exports.login = async (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send({ code: "ValidationError", type: "error" });

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ "auth.username": username });

        if (!user || !bcrypt.compareSync(password, user.auth.password)) {
            return res.status(401).send({
                code: "UsernamePasswordWrong",
                type: "error"
            });
        }

        const payload = { pk: user.auth.public_key };
        const options = {
            expiresIn: CONFIG.auth.expiration_time,
            issuer: CONFIG.auth.issuer
        };

        const token = JWT.sign(payload, CONFIG.auth.secret, options);

        const userSafe = { ...user._doc };
        delete userSafe.auth.password;
        delete userSafe.auth.private_key;

        return res.header("Authorization", token)
                  .status(200)
                  .send(userSafe);
    } catch (err) {
        return res.status(500).send({ code: "ServerError", type: "error" });
    }
};

/**
 * Middleware para checar autenticação via JWT
 */
exports.checkAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ code: "TokenInvalid", type: "error" });

    try {
        const payload = JWT.verify(token, CONFIG.auth.secret);
        const user = await User.findOne({ "auth.public_key": payload.pk });

        if (!user) return res.status(401).send({ code: "TokenInvalid", type: "error" });

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send({ code: "TokenInvalid", type: "error" });
    }
};

/**
 * Criação de novo usuário
 */
exports.createUser = async (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send({ code: "ValidationError", type: "error" });

    const { username, password, name, type, birth_date, description, location } = req.body;

    try {
        const existingUser = await User.findOne({ "auth.username": username });
        if (existingUser) return res.status(409).send({ code: "UserExists", type: "error" });

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            auth: {
                username,
                password: hashedPassword,
                public_key: crypto.randomBytes(16).toString('hex'),
                private_key: crypto.randomBytes(32).toString('hex')
            },
            name,
            type,
            birth_date,
            description,
            location
        });

        const userSaved = await newUser.save();
        const userSafe = { ...userSaved._doc };
        delete userSafe.auth.password;
        delete userSafe.auth.private_key;

        return res.status(201).send(userSafe);
    } catch (err) {
        return res.status(500).send({ code: "ServerError", type: "error" });
    }
};


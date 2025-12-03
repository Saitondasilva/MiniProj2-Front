const express = require('express'); // <--- ADICIONA ISTO NO TOPO

module.exports = (app) => {
    const cookieParser = require('cookie-parser');
    const cors = require('cors');

    app.use(cors());
    app.options('*', cors());

    app.use(express.json());                     // PARA JSON
    app.use(express.urlencoded({ extended: true }));  // PARA FORM-URLENCODED

    app.use(cookieParser());

    app.set('trust proxy', 1);
}

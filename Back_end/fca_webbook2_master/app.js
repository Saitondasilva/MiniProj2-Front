const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const db = require('./init/db');
const authRoutes = require('./routes/auth.routes');
const animalRoutes = require('./routes/animal.routes');
const expertsRoutes = require('./routes/experts.routes');

const app = express();
const port = process.env.PORT || 8082;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Rotas
app.use('/auth', authRoutes); // prefixo das rotas
app.use('/animal', animalRoutes); // prefixo das rotas
app.use('/experts', expertsRoutes); // prefixo das rotas

// Conectar DB e iniciar servidor
db().then(() => {
    app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
    });
});

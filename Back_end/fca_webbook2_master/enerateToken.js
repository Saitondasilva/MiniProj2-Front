const jwt = require('jsonwebtoken');
require('dotenv').config();

const payload = {
    pk: 'db7aab812l7',
    name: 'Teste'
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

console.log(token);

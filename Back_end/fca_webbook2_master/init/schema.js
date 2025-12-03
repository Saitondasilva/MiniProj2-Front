// init/schema.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const animalSchema = new mongoose.Schema({
    name: String,
    species: String
});

module.exports = {
    User: mongoose.model('User', userSchema),
    Animal: mongoose.model('Animal', animalSchema)
};

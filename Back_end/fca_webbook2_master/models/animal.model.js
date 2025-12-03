const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const animalSchema = new Schema({
    name: { type: String, required: true, trim: true },
    group: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    links: [{
        types: { type: String, required: true, trim: true },
        url: { type: String, required: true, trim: true }
    }],
    level: { type: Number, required: true },

    evaluation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: CONFIG.mongodb.collections.user
    }],

    comments: [{
        body: { type: String, trim: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: CONFIG.mongodb.collections.user
        },
        date: { type: Date, default: Date.now }
    }],

    active: { type: Boolean, default: true }

}, { timestamps: true });

module.exports =
    mongoose.models[CONFIG.mongodb.collections.animal] ||
    mongoose.model(CONFIG.mongodb.collections.animal, animalSchema);

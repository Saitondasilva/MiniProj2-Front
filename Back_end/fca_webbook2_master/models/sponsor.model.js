const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SponsorSchema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    localizacao: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        trim: true,
        default: null
    },
    contacto: {
        type: String,
        trim: true,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Sponsor", SponsorSchema);

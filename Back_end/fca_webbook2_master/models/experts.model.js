const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SponsorSchema = new Schema(
    {
        // Dados básicos do sponsor
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

        // Relacionamento com outros modelos (exemplo: campanhas)
        campaigns: [
            {
                type: Schema.Types.ObjectId,
                ref: "campaigns" // ou outro modelo relacionado
            }
        ],

        // Ativação / desativação
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("sponsors", SponsorSchema);

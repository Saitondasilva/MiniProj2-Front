const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpertsSchema = new Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },

        especialidade: {
            type: String,
            required: true,
            trim: true
        },

        titulo_academico: {
            type: String,
            required: true,
            trim: true
        },

        // Relacionamento com Questions
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: "questions"
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

module.exports = mongoose.model("experts", ExpertsSchema);

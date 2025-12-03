const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   auth: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    public_key: { type: String, required: true },
    private_key: { type: String, required: true }
},
name: { type: String, required: true },
type: { type: String, required: true },
birth_date: { type: Date },
description: { type: String },
location: {
    city: String,
    district: String,
    country: String
},
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', UserSchema);

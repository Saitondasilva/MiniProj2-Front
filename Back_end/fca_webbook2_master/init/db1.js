// init/db.js
const mongoose = require('mongoose');
const CONFIG = require('../config/config');

module.exports = async () => {
    try {
        await mongoose.connect(CONFIG.mongodb.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('---Connected to MongoDB');
    } catch (err) {
        console.error('❌ Failed to connect to DB:', err);
        process.exit(1);
    }
};

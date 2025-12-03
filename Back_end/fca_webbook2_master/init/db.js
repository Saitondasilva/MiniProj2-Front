// init/db.js
/*require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async () => {
  const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  try {
    await mongoose.connect(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('---Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
*/

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



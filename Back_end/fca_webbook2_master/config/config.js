require('dotenv').config();

const buildMongoURI = () => {
    const host = process.env.MONGO_HOST;
    const port = process.env.MONGO_PORT;
    const db = process.env.MONGO_DB;
    const user = process.env.MONGO_USER;
    const pass = process.env.MONGO_PASS;

    if (user && pass) {
        return `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`;
    }
    return `mongodb://${host}:${port}/${db}`;
};

module.exports = {
    server: {
        port: process.env.PORT || 8082
    },
    mongodb: {
        uri: buildMongoURI(),
        collections: {
            animal: 'animals',
            question: 'questions',
            quiz: 'quizzes',
            user: 'users',
            user_levels: "user_levels"
        }
    },
    auth: {
        secret: process.env.JWT_SECRET,
        expiration_time: process.env.JWT_EXPIRATION, // "1h"
        issuer: process.env.JWT_ISSUER
    },
    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ ",
        numerical: "0123456789"
    },
    email: {
        service: "Gmail",
        auth: {
            user: "mailserverpw@gmail.com",
            pass: "ttxirdxzkafhcuel"
        }
    }
};

/*require('dotenv').config();

module.exports = {
    server: {
        port: process.env.PORT || 8082
    },
    mongodb: {
        uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
        collections: {
            animal: 'animals',
            question: 'questions',
            quiz: 'quizzes',
            user: 'users',
            user_levels: "user_levels"
        }
    },
    auth: {
        secret: process.env.JWT_SECRET,
        expiration_time: process.env.JWT_EXPIRATION || 15000,
        issuer: process.env.JWT_ISSUER || "FCA"
    },
    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
        numerical: "0123456789"
    },
    email: {
        service: "Gmail",
        auth: {
            user: "mailserverpw@gmail.com",
            pass: "ttxirdxzkafhcuel"
        }
    }
}
*/

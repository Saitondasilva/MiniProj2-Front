// initData.js
const Animal = require('./models/animal');

const createAnimal = async () => {
    try {
        await Animal.create({ name: 'Elefante', species: 'Elephantidae' });
        console.log('Animal criado!');
        process.exit();
    } catch (err) {
        console.error('Erro ao criar animal:', err);
        process.exit(1);
    }
}

createAnimal();

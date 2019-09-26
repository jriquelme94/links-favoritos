// Requiero el módulo "Bcryptjs" para cifrar contraseñas.
const bcrypt = require('bcryptjs');
// Creo el objeto "helpers" que contendrá métodos que serán reuilizados.
const helpers = {};

helpers.encryptPassword = async (password) => {
    // Ejecuto 10 veces un algoritmo para crear un salt para poder generar un hash.
    const salt = await bcrypt.genSalt(10);
    // Encipto el dato tomando como base mi password y mi salt.
    const hash = await bcrypt.hash(password, salt);
    // Devuelvo mi dato cifrado.
    return hash;
};

// Comparo la contraseña encriptada e ingresada por el usuario, con la almacenada y encriptada en mi BD.
helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch(e) {
        console.log(e);
    }
};

module.exports = helpers;
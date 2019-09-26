// Requiero TimeAgo.Js para poder manejar las fechas en Timestamp para que se visualicen con el formato "hace 2 horas".
const { format } = require('timeago.js');

const helpers = {};

// Creo una función que toma como parámetro una fecha en timestamp y la convierte.
helpers.timeago = (timestamp) => {
    return format(timestamp);
};

module.exports = helpers;
// Este archivo se utiliza para almacenar las rutas principales de mi app (como para ir a 'Contacto', o 'Más Sobre Nosotros')
const express = require('express');
// Establezo que sólo quiero el módulo 'Router' de Express.
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/index');
});

// Exporto el módulo Router para poder utilizarlo.
module.exports = router;
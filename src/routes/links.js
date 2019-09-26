const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// Indico lo que ocurrirá cuando se visite la ruta links/add.
router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

/* Indico lo que ocurrirá cuando mi app reciba datos desde el formulario y quiera almacenarlos en la BD. 
Establezco la palabra "async" dentro de mi función post, y luego la palabra "await" antes de usar el pool.query. */
router.post('/add', isLoggedIn, async (req, res) => {
    // Recibo los datos enviados desde mi formulario.
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    console.log(newLink);
    // Guardo los datos en mi BD.
    await pool.query('INSERT INTO links SET ?', [newLink]);
    // Utilizo Connect Flash para informar al usuario que el link se a creado correctamente.
    req.flash('success','Link creado correctamente!');
    res.redirect('/links');
});

// Establezco lo que sucederá cuando el usuario ingrese a la página con sus links.
router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', {links});
});

// Establezo lo que sucederá cuando el usuario solicite eliminar un Link.
router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link eliminado correctamente!');
    res.redirect('/links');
});

// Establezo lo que sucederá cuando el usuario solicite actualizar un link.
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {links: links[0]});
});

// Continúo con mi actualización 
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    // Creo un objeto que almacene los datos que se van a acutalizar, para luego utilizar el mismo en la consulta MySQL.
    const { title, description, url } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    const update = await pool.query(`UPDATE links SET title = '${title}', url = '${url}', description = '${description}' WHERE id = ${id}`);
    req.flash('success','Link editado correctamente!');
    res.redirect('/links');
});

// Exporto mi módulo "router" para poder utilizar mi enrrutador.
module.exports = router;
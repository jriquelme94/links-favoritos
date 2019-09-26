const express = require('express');
// Requiero el módulo Router de Express.
const router = express.Router();
// Requiero el archivo "passport.js" ubicado en mi carpeta "lib".
const passport = require('passport'); 
// Requiero el archivo "auth.js" para saber si mi usuario está loggueado o no.
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// Redirigo a la ruta para que mi usuario se registre.
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

/* Establezclo lo que sucederá cuando el usuario haya ingresado sus datos y haga clic en el botón "Registrame!" , 
utilizando el módulo Passport y Flash (par el envío de mensajes). */
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// Redirigo a la ruta para que mi usuario se loguee.
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

// Establezclo lo que sucederá cuando el usuario solicite ingresar.
router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        // Redirigo a mi ruta "/profile" si el ingreso fue satisfactorio.
        successRedirect: '/profile',
        // Redirigo a mi ruta "/signin" si el ingreso fue erroneo para que se vuelva a ingresar usuario y contraseña.
        failureRedirect: '/signin/',
        // Indico que voy a utilizar mis mensajes en Flash Connect.
        failureFlash: true
    })(req, res, next);
});

// Redirijo a la ruta del Perfil cuando mi usuario se ha logueado. Para saberlo, ejecuto mi método "IsLoggedIn".
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

// Indico lo que sucederá cuando el usuario cierre sesión.
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

// Exporto mi módulo "router" para poder utilizar mi enrrutador.
module.exports = router;
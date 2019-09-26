// Requiero Passport para poder registrar usuarios de manera segura.
const passport = require('passport');
// Requiero Local Passport para registar usuarios de manera segura en mi propia BD y utilizo la clase Strategy.
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

/* Utilizo Passport con la clase LocalStrategy e indico de dónde se obtendrán los datos envidados por el usuario. 
Es decir, indico los valores de las propiedades name de mi archivo signup.hbs. */
passport.use('local.signup', new LocalStrategy ({
    usernameField: 'username',
    passwordField: 'password',    
    passReqToCallback : true
}, async (req, username, password, done) => {
    // Almaceno el "fullname" del usuario a registrar tomandolo del req.body.
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    // Ejecuto un query para almacenar los datos en mi BD.
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    // Una vez creado el Usuario, obtengo su Id para poder crear una sesión para ese Id.
    newUser.id = result.insertId;
    return done(null, newUser);
}));

// Serealizo mi usuario según su Id para otorgar mayor seguridad.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserealizo el usuario según su Id para volver a obtener sus datos.
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});

passport.use('local.signin', new LocalStrategy ({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido, ' + user.username + '!'));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        };
    } else {
        return done(null, false, req.flash('message', 'El usuario no existe'));
    };
}));
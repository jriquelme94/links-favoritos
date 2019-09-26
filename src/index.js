// Establezco lo que necesito para que me aplicación pueda funcionar.
// 'Express' es un Framework para poder crear Web Apps y APIs.
const express = require('express');
// Morgan se utiliza para registrar las solicitudes HTTP que llegan al servidor y mostrarlas en consola.
const morgan = require('morgan');
// Handlebars contiene plantillas para no usar HTML puro. REEMPLAZAR A FUTURO POR HTML Y CSS PROPIO!
const exphbs = require('express-handlebars');
// Path sirve para indicar Paths a directorios. Ej: src/views.
const path = require('path');
// Requiero "Connect Flash" para poder enviar mensajes entre vistas.
const flash = require('connect-flash');
// Requiero "Express Session" para guardar datos de la sesiones de mis usuarios.
const session = require('express-session');
// Requiero "Express MySQL Session" para almacenar los datos de las sesiones en mi BD de MySQL.
const mySqlStore = require('express-mysql-session')
// Requiero el objeto "database" de mi archivo keys.js que contien los datos de conexión.
const { database } = require('./keys');
// Requiero "Passport" para poder almacenar sesiones de usuario.
const passport = require('passport');

// Inicialización
const app = express();
// Requiero el archivo "passport.js" ubicado en mi carpeta "lib".
require('./lib/passport');

// Configuración

// Declaro en qué puerto voy a iniciar mi aplicación y si hay un puerto abierto, lo utilizo. Si no, se usará el 4000.
app.set('port', process.env.PORT || 4000);
// Establezco el nombre del path para la carpeta Views
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    // Establezco cúal será la plantilla principal y su nombre.
    defaultLayout: 'main',
    // Establezco la carpeta donde estarán mis layouts.
    layoutsDir : path.join(app.get('views'), 'layout'),
    /* Establezco la carpeta donde estarán mis Partials, que son bloques de código para que cierta funcionlidad, 
    pueda ser reutilizada en varias partes de mi app.*/
    partialsDir: path.join(app.get('views'), 'partials'),
    // Establezco que mis archivos Handlebars serán con la extensión '.hbs'.
    extname: '.hbs',
    /* Añado mi "helper" que son necesarios para poder realizar operaciones cuyos resultados serán devueltos a mi 
    archivo "main.hbs", ya que Handlebars no realiza operaciones, y necesita que JavaScript lo haga. Por ejemplo, 
    parsear una fecha. */
    helpers: require('./lib/handlebars')
}));
// Establezco mi motor de plantillas (Handlebars) para poder utilizarlo.
app.set('view engine', '.hbs');

// Middleweares (utilidades).

// Utilizo los módulos Express Session y MySQL Express Session para guardar datos de las sesiones en mi BD.
app.use(session ({
    secret: 'JoeMySQLNodeSession',
    resave: false,
    saveUninitialized: false,
    store: new mySqlStore(database)
}));
// Establezco que utilizaré Morgan con formato "dev" para ver las interacciones entre el cliente y servidor.
app.use(morgan('dev'));
/* Establezco que usaré el módulo "urlencoded" de Express para poder utilizar los datos (desde los formularíos) 
que envía el cliente a mi app, aceptando datos sencillos y SIN IMAGENES! */
app.use(express.urlencoded({ extended: false }));
// Establezco que voy a usar archivos .json.
app.use(express.json());
// Utilizo "Connect Flash".
app.use(flash());
// Utilizo "Passport".
app.use(passport.initialize());
app.use(passport.session());

// Variables Globales

// Establezco mis Variables Globales que serán utilizadas en toda mi app.
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    // Variable global con los datos del usuario loggueado para que sean accedidas desde cualquier vista.
    app.locals.user = req.user;
    next();
});

// Rutas

// Indico a la aplicación, las rutas de mis archivos .js de mi carpeta "routes".
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// Público
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el Servidor
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});
// Creo un método para saber si el usuario está loggeado o no.
module.exports = {

    // Si el usuario trata de visitar rutas sin estar loggeado, es redirijido a la ruta de Inicio de Sesión.
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else return res.redirect('/signin');
    },

    // Si el usuario trata de regitrarse o de ingresar estando loggeado, será redirijido a otras rutas.
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        else return res.redirect('/profile');
    }
};
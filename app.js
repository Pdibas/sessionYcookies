const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const indexRouter = require('./routes/indexRoutes');
const createError = require('http-errors');

const app = express();

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "keySecret",
    resave: false,
    saveUninitialized: false
}))

app.use('/', indexRouter);

// captura el error 404 y reenvia
app.use(function(req, res, next) {
    next(createError(404));
});

/* manejador de errores */
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    /* renderiza la pagina de errores */
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
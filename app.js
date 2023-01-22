require('dotenv/config');

require('./db');

const express = require('express');
const path = require("path");
const hbs = require('hbs');
hbs.registerPartials(`${__dirname}/views/partials`)
// hbs.registerPartials(path.join(__dirname, "views", "partials"))
const app = express();

require('./config')(app);

app.locals.title = `Celebrities`;

const index = require('./routes/index');
const celebrities = require('./routes/celebrities.routes');
const movies = require('./routes/movies.routes');

app.use('/', index);
app.use('/celebrities', celebrities);
app.use('/movies', movies);

require('./error-handling')(app);

module.exports = app;

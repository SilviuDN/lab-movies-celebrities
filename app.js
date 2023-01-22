require('dotenv/config');

require('./db');

const express = require('express');
const hbs = require('hbs');
const app = express();

require('./config')(app);

app.locals.title = `Celebrities`;

const index = require('./routes/index');
const celebrities = require('./routes/celebrities.routes');

app.use('/', index);
app.use('/celebrities', celebrities);

require('./error-handling')(app);

module.exports = app;

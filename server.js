// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

const methodOverride = require('method-override');
app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(methodOverride('_method'));
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require('./routes/users');
const usersLoginRoutes = require('./routes/users');
const mapRoutes = require('./routes/maps');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/users', usersRoutes);
app.use('/login', usersLoginRoutes);
app.use('/logout', usersLoginRoutes);
app.use('/', usersLoginRoutes);
app.use('/maps', mapRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {

  const user = {
    id: req.session['user_id'],
    username: req.session['username']
  }

  const templateVars = {
    user
  };
  console.log(templateVars);
  res.render('index', templateVars);
});
const favRoutes = require('./routes/favorite');
app.use('/maps', favRoutes);
//app.use('/maps/delete', favRoutes);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

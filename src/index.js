const express = require('express');
const morgan = require('morgan');
const exphbs = require("express-handlebars");
const path = require('path');
const passport = require("passport");
const flash = require("connect-flash");
// INICIALIZATION

const app = express();
require('./lib/passport.js');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const {database} = require('./keys.js')
// SETTINGS

app.set('port', 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join(app.get('views'),'partials'),
  extname: '.hbs',
  helpers : require('./lib/handlebars.js')
}));
app.set('view engines','.hbs');

// MIDDLEWARES
app.use(session({
  secret: 'login',
  resave: false,
  saveUninitialized : false,
  store : new MySQLStore(database),
}));
app.use(flash());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL VARIABLES

app.use((req,res,next)=>{
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;

  next();
});

// ROUTES

app.use(require('./routes/index.js'));
app.use('/bike',require('./routes/bike.js'));
app.use(require('./routes/auth.js'));
app.use('/team',require('./routes/team.js'));
// PUBLIC

app.use(express.static(path.join(__dirname,'public')));

// START THE SERVER

app.listen(app.get('port'),(req,res)=>{
  console.log('Server on port:',app.get('port'));
});
const express = require('express');
const morgan = require('morgan');
const exphbs = require("express-handlebars");
const path = require('path');
const passport = require("passport");
const flash = require("connect-flash");
// INICIALIZATION

const app = express();

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
app.use(flash());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));

// GLOBAL VARIABLES

app.use((req,res,next)=>{
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');

  next();
});

// ROUTES

app.use(require('./routes/index.js'));

// PUBLIC

app.use(express.static(path.join(__dirname,'public')));

// START THE SERVER

app.listen(app.get('port'),(req,res)=>{
  console.log('Server on port:',app.get('port'));
});
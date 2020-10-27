const passport = require('passport');
const pool = require('../database.js');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('../lib/helpers.js');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req,username,password,done)=>{
  const rows = await pool.query('SELECT * FROM user WHERE username = ?',[username]);
  if (rows.length > 0){
    const user = rows[0];
    const validPass = await helpers.matchPassword(password,user.password);
    if (validPass){
      done(null,user,req.flash('success',`Welcome ${user.fullname}!!!`));
    } else {
      done(null,false,req.flash('message',"Incorrect Password"));
    }
  } else {
    return done(null,false,req.flash('message',"The Username does not exists"));
  }
}));

passport.use('local.signup',new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req,username,password,done)=>{

  const {fullname, birth_date} = req.body;
  let newUser = {fullname,birth_date,username,password};
  newUser.password = await helpers.encryptPassword(password);
  const result = await pool.query('INSERT INTO user set ?', [newUser]);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
  done(null,rows[0]);
});
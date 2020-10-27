const express = require("express");
const pool = require("../database.js");
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth.js');

router.get('/signup',isNotLoggedIn,(req,res)=>{
  res.render('auth/signup.hbs')
})

router.post('/signup',isNotLoggedIn,passport.authenticate(
  'local.signup',
  {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }
));

router.get('/signin', isNotLoggedIn ,(req,res)=>{
  res.render('auth/signin.hbs');
});

router.post('/signin',(req,res,next)=>{
  passport.authenticate('local.signin',{
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  })(req,res,next);

});

router.get('/logout',(req,res)=>{
  req.logOut();
  res.redirect('/');
});
router.get('/profile',isLoggedIn,(req,res,next)=>{
  res.render('profile.hbs');
});

module.exports = router;
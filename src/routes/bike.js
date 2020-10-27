const express = require("express");
const router = express.Router();
const pool = require('../database.js');
const helpers = require('../lib/helpers.js');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth.js');

router.get('/',async(req,res)=>{
  const bikes = await pool.query('SELECT * FROM bike WHERE user_id = ?',req.user.id);
  res.render('bike/index.hbs',{bikes});
});

// ADD NEW BIKE
router.get('/add',isLoggedIn,(req,res)=>{
  res.render("bike/add.hbs");
});

router.post('/add',isLoggedIn,async(req,res)=>{
  const {name,size,wheel_size,shifter} = req.body;
  const newBike = {
    name,
    size,
    wheel_size,
    shifter,
    user_id: req.user.id
  };
  await pool.query('INSERT INTO bike set ?', [newBike]);
  res.redirect("/bike");  
});

// EDIT MY BIKE

router.get('/edit/:id',isLoggedIn,async(req,res)=>{
  const {id} = req.params;
  const bikes = await pool.query("SELECT * FROM bike WHERE id = ?",[id]);
  const wheel_correct = helpers.selector(['24"','26"','27.5"','29"'],bikes[0].wheel_size);
  const size_correct = helpers.selector(["XS","S","M","L","XL"],bikes[0].size);
  res.render('bike/edit.hbs',{bike: bikes[0], wheel_correct, size_correct});
});

router.post('/edit/:id',isLoggedIn,async(req,res)=>{
  const {id} = req.params;
  const {name,size,wheel_size,shifter} = req.body;
  const newBike = {
    id,
    name,
    size,
    wheel_size,
    shifter
  };
  console.log(id);
  await pool.query('UPDATE bike set ? WHERE id = ?', [newBike,id]);
  res.redirect('/bike');  
});

router.get('/delete/:id',isLoggedIn,async(req,res)=>{
  const {id} = req.params;
  const bikes = await pool.query('DELETE FROM bike WHERE id = ?',[id]);
  res.redirect('/bike')
});
module.exports = router;
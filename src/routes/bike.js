const express = require("express");
const router = express.Router();
const pool = require('../database.js');
const helpers = require('../lib/helpers.js');

router.get('/',(req,res)=>{
  res.send("ACA VA A APARECE TU ACTUAL BICI Y LA OPCION DE ELIMINARLA O EDITARLA")
});

// ADD NEW BIKE
router.get('/add',(req,res)=>{
  res.render("bike/add.hbs");
});

router.post('/add',async(req,res)=>{
  const {name,size,wheel_size,shifter} = req.body;
  const newBike = {
    name,
    size,
    wheel_size,
    shifter
  };
  await pool.query('INSERT INTO bike set ?', [newBike]);
  res.send("listo");  
});

// EDIT MY BIKE

router.get('/edit/:id',async(req,res)=>{
  const {id} = req.params;
  const bikes = await pool.query("SELECT * FROM bike WHERE id = ?",[id]);
  const wheel_correct = helpers.selector(['24"','26"','27.5"','29"'],bikes[0].wheel_size);
  const size_correct = helpers.selector(["XS","S","M","L","XL"],bikes[0].size);
  res.render('bike/edit.hbs',{bike: bikes[0], wheel_correct, size_correct});
});

router.post('/edit/:id',async(req,res)=>{
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
  res.redirect('/');  
});
module.exports = router;
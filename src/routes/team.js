const express = require("express");
const router = express.Router();
const pool = require('../database.js');

router.get('/create',(req,res)=>{
  res.render('team/create.hbs');
});

router.post('/create',async (req,res)=>{
  const {teamname,description} = req.body;
  let actualUser = req.user
  const newTeam = {
    teamname,
    description
  }
  const query = await pool.query('INSERT INTO team set ?',[newTeam]);
  actualUser.team_id = query.insertId
  res.redirect('/team/create');
  await pool.query('UPDATE user set ? WHERE id = ?',[actualUser,actualUser.id])
});

router.get('/delete',async(req,res)=>{
  let actualUser = req.user;
  const team_id = actualUser.team_id;
  actualUser.team_id = null;
  await pool.query('UPDATE user set ? WHERE id = ?',[actualUser,actualUser.id]);
  try {
    await pool.query('DELETE FROM team WHERE id = ?'[team_id]);
  } catch (error) {
    console.log("Equipo no fue eliminado");
  }
  res.redirect('/')
});
module.exports = router;
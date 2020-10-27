const express = require("express");
const router = express.Router();
const pool = require('../database.js');
const {hasTeam,hasNotTeam} = require('../lib/team.js')

router.get('/create',hasNotTeam,(req,res)=>{
  res.render('team/create.hbs');
});

router.post('/create',hasNotTeam,async (req,res)=>{
  const {teamname,description} = req.body;
  let actualUser = req.user
  const newTeam = {
    teamname,
    description
  }
  const query = await pool.query('INSERT INTO team set ?',[newTeam]);
  actualUser.team_id = query.insertId
  res.redirect('/');
  await pool.query('UPDATE user set ? WHERE id = ?',[actualUser,actualUser.id])
});

router.get('/delete',hasTeam,async(req,res)=>{
  let actualUser = req.user;
  const team_id = actualUser.team_id;
  actualUser.team_id = null;
  await pool.query('UPDATE user set ? WHERE id = ?',[actualUser,actualUser.id]);
  try {
    await pool.query('DELETE FROM team WHERE id = ?',[team_id]);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/')
});

router.get('/view',async(req,res)=>{
  console.log(req.user.team_id);
  const teams = await pool.query('SELECT * FROM team WHERE id = ?',[req.user.team_id]);
  res.render('team/view.hbs',{team: teams[0]});

});
module.exports = router;
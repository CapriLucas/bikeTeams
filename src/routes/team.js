const express = require("express");
const router = express.Router();
const pool = require("../database.js");
const { hasTeam, hasNotTeam } = require("../lib/team.js");

router.get("/create", hasNotTeam, (req, res) => {
	res.render("team/create.hbs");
});

router.post("/create", hasNotTeam, async (req, res) => {
	const { teamname, description } = req.body;
	let actualUser = req.user;
	const newTeam = {
		teamname,
		description,
	};
	const query = await pool.query("INSERT INTO team set ?", [newTeam]);
	actualUser.team_id = query.insertId;
	res.redirect("/");
	await pool.query("UPDATE user set ? WHERE id = ?", [
		actualUser,
		actualUser.id,
	]);
});

router.get("/delete", hasTeam, async (req, res) => {
	let actualUser = req.user;
	const team_id = actualUser.team_id;
	const teamMates = await pool.query("SELECT id FROM user WHERE team_id = ?", [
		team_id,
	]);
	console.log(teamMates);
	actualUser.team_id = null;
	await pool.query("UPDATE user set ? WHERE id = ?", [
		actualUser,
		actualUser.id,
	]);
	if (teamMates.length == 1) {
		// Se eliminan todas las rutas del equipo y luego el equipo, ya que deja de tener miembros
		await pool.query("DELETE FROM tour WHERE team_id = ?", [team_id]);
		await pool.query("DELETE FROM team WHERE id = ?", [team_id]);
	}
	res.redirect("/");
});

router.get("/view", async (req, res) => {
	console.log(req.user.team_id);
	const teams = await pool.query("SELECT * FROM team WHERE id = ?", [
		req.user.team_id,
	]);
	res.render("team/view.hbs", { team: teams[0] });
});

router.get("/join/:id", async (req, res) => {
	const userId = req.user.id;
	const newTeamId = req.params.id;
	try {
		await pool.query("UPDATE user SET team_id = ? WHERE id = ?", [
			newTeamId,
			userId,
		]);
	} catch (error) {
		res.redirect("/");
	}
	res.redirect("/team/view");
});
module.exports = router;

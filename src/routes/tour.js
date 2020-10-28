const express = require("express");
const pool = require("../database.js");
const router = express.Router();
const { hasNotTeam, hasTeam } = require("../lib/team.js");

router.get("/", async (req, res) => {
	const userID = req.user.id;
	const teamID = 0 || req.user.team_id;
	const tours = await pool.query(
		"SELECT * FROM tour WHERE user_id = ? or team_id = ?",
		[userID, teamID]
	);
	res.render("tour/index.hbs", { tours });
});

router.get("/alone", (req, res) => {
	res.render("tour/add.hbs", { team: false });
});

router.post("/alone", async (req, res) => {
	const userId = req.user.id;
	const { distance, duration, date, description } = req.body;
	const newTour = {
		distance,
		duration,
		date,
		description,
		user_id: userId,
		team_id: null,
	};
	await pool.query("INSERT INTO tour set ?", [newTour]);
	res.redirect("/tour");
});
router.get("/team", hasTeam, (req, res) => {
	res.render("tour/add.hbs", { team: true });
});

router.post("/team", hasTeam, async (req, res) => {
	const teamId = req.user.team_id;
	const { distance, duration, date, description } = req.body;
	const newTour = {
		distance,
		duration,
		date,
		description,
		user_id: null,
		team_id: teamId,
	};
	await pool.query("INSERT INTO tour set ?", [newTour]);
	res.redirect("/tour");
});

module.exports = router;

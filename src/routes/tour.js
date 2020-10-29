const express = require("express");
const pool = require("../database.js");
const router = express.Router();
const { hasNotTeam, hasTeam } = require("../lib/team.js");
const moment = require("moment");

router.get("/", async (req, res) => {
	const userID = req.user.id;
	const teamID = 0 || req.user.team_id;
	const tours = await pool.query(
		"SELECT * FROM tour WHERE user_id = ? or team_id = ?",
		[userID, teamID]
	);
	tours.forEach(singleTour => {
		singleTour.date = moment(singleTour.date).utc().format("YYYY-MM-DD");
	});
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

// DELETE AND EDIT OPTIONS

router.get("/delete/:id", async (req, res) => {
	const tourId = req.params.id;
	await pool.query("DELETE FROM tour WHERE id = ?", [tourId]);
	res.redirect("/tour");
});

router.get("/edit/:id", async (req, res) => {
	const tourId = req.params.id;
	const tours = await pool.query("SELECT * FROM tour WHERE id = ?", [tourId]);
	const tour = tours[0];
	tour.date = moment(tour.date).utc().format("YYYY-MM-DD");
	res.render("tour/edit.hbs", { team: false, tour });
});

router.post("/edit/:id", async (req, res) => {
	const tourId = req.params.id;
	const { duration, distance, description, date } = req.body;
	const newTour = {
		duration,
		distance,
		description,
		date,
	};
	await pool.query("UPDATE tour SET ? WHERE id = ?", [newTour, tourId]);
	res.redirect("/tour");
});

module.exports = router;

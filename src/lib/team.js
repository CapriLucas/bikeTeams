module.exports = {
  hasTeam (req, res, next) {
      if (req.user.team_id) {
          return next();
      }
      return res.redirect('/team/create');
  },
  hasNotTeam (req, res, next) {
    if (!req.user.team_id) {
        return next();
    }
    return res.redirect('/');
}
};
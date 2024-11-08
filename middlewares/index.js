function checkAuth(req, res, next) {
  if (req.session && req.session.user || req.isAuthenticated()) { //Verifica se tem sessões de usuários
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = {
  checkAuth,
};

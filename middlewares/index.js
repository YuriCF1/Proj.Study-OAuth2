function checkAuth(req, res, next) {
  const auth = true;
  if (auth) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = {
  checkAuth,
};

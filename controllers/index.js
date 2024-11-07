const bcryp = require("bcrypt");
const User = require("../models/user");

exports.showIndex = (req, res, next) => {
  res.render("index");
};

exports.showPageSignUp = (req, res, next) => {
  res.render("signUp");
};

exports.showMembersPage = (req, res) => {
  res.render("members", { user: req.user });
};

exports.get404Page = (req, res, next) => {
  res.status(404).render("404");
};

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryp.hash(password, 10);
  const user = new User(username, email, hashedPassword);

  try {
    await user.saveDataInDB();
    res.redirect("./");
  } catch (error) {
    console.log(error);
    res.redirect("signup");
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne(email, password);
    console.log("User:", user);
    if (user) {
      req.session.user = user;
      res.redirect("/members");
    } else {
      res.render("index"); //Na configuração do servidor, o Express busca pelo arquivo template dentro da pasta views
    }
  } catch (error) {
    console.log(error);
    res.render("index");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
};

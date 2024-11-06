const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
require("dotenv").config();

passport.serializeUser(function (user, done) {
  done(null, user); //Erro e usuário
});

passport.deserializeUser(function (obj, done) {
  done(null, obj); //obj é o usuário
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    //   function(accessToken, refreshToken, profile, done) {
    //     User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //       return done(err, user);
    //     });
    //   }
    // ));
    function (accessToken, refreshToken, profile, done) {
      const user = {
        id: profile.id,
        photo: profile.photos[0].value,
      };
      // return done(err, profile.id); //Caso eu queira tratar um erro de achar ou não ter conseguido criar um user no db
      return done(null, user);
    }
  )
);

module.exports = passport;
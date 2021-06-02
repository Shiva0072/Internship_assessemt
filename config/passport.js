const passport=require("passport");
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const todos=require("../models/todos.js");

passport.use(new LinkedInStrategy({
  clientID: "77c63g8lhxatya",
  clientSecret: "108VZaEeTFQZgSOQ",
  callbackURL: "http://localhost:8008/users/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
        // console.log("==================START===========================");
        // console.log(profile); ////see what it returns and now create the Schema
        // console.log("===================END==========================");
        return done(null,profile);
    }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports=passport;
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

const todos = require("../models/todos.js");

passport.use(
  new LinkedInStrategy(
    {
      clientID: "77c63g8lhxatya",
      clientSecret: "108VZaEeTFQZgSOQ",
      callbackURL: "http://localhost:8008/users/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    function (accessToken, refreshToken, profile, done) {
      //// console.log("==================START===========================");
      //// console.log(profile); ////see what it returns and now create the Schema
      //// console.log("===================END==========================");
      ////find the user
      todos
        .findOne({ email: profile.emails[0].value })
        .exec(function (err, doc) {
          if (err) {
            console.log("Some error in querying the document", err);
            return;
          }
          if (doc) {
            // if found, set this user as req.user
            return done(null, doc);
          } else {
            ////create the identity for this user
            todos.create(
              {
                user_id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                password: profile.id,
              },
              function (err, doc) {
                if (err) {
                  console.log("Error in creating the new user ", err);
                  return;
                }
                return done(null, doc);
              }
            );
          }
        });
    }
  )
);

//set the doc._id only in the cookies
passport.serializeUser(function (doc, done) {
  done(null, doc._id);
});

passport.deserializeUser(function (id, done) {
  todos.findById(id,function(err,doc){
    if (err) {
      console.log("Error in creating the new user ", err);
      return;
    }
    return done(null, doc);
  });
});

//MW(s)
//check if the user is authenticated 
passport.checkAuthentication=function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  ///TODO sending back to login page
  return res.redirect("/");
}

passport.setAuthenticatedUser=function(req,res,next){
  if(req.isAuthenticated()){
    res.locals.todos=req.user; //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
  }
  next();
}

module.exports = passport;

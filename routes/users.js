const express=require("express");
const router=express.Router();
const passport=require("passport");

const user=require("../controllers/users");

router.get("/signUp",user.profile);

router.get("/auth/linkedin",passport.authenticate(
    'linkedin',  { state: "SOME STATE" }
), 
// function(req,res){
//     console.log("Logged in linkedin");
//     return;
// }
);
router.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", {
      successRedirect: "/",
      failureRedirect: "/",
    })
  );

module.exports=router;
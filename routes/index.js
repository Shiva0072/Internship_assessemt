const express=require("express");
const router=express.Router();
const passport=require("passport");

const home=require("../controllers/home");

// router.get("/",passport.checkAuthentication,home.userhome);
router.get("/",home.userhome);
router.use("/users",require("./users"));

module.exports=router;
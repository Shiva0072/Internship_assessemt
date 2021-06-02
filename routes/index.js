const express=require("express");
const router=express.Router();

const home=require("../controllers/home");

router.get("/",home.userhome);
router.use("/users",require("./users"));

module.exports=router;
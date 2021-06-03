const express = require("express");
const router = express.Router();
const passport = require("passport");

const user = require("../controllers/users");

////signUp
router.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", { state: "SOME STATE" })
//   ,function(req,res){
//       console.log("Logged in linkedin");
//       return;
//     } 
);

router.get("/profile",user.profile);

router.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/users/profile",
    failureRedirect: "/",
  }),
  user.createSession
);

router.get("/signout",passport.checkAuthentication,user.destroySession);

router.post("/createTodo",user.check_todo_empty,user.createTodo);

router.get("/deleteTodo/:todoId",user.delete);

router.get("/update/:todoId",user.update_1);

router.post("/update_2/:todoId",user.update_2);

module.exports = router;

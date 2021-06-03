const todos=require("../models/todos.js");

module.exports.profile=function(req,res){

    todos.find({},function(err,docs){
        if(err){
            console.log("Error in finding the documents");
            return;
        }
        return res.render("home",{
            title:"TODO Website",
            docs:docs
        });
    });
};

module.exports.createSession=function(req,res){
    // return res.redirect("/users/profile");
    // return res.render("profile");
    return res.redirect("/");
}

module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect("/");
}
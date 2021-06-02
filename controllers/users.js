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

module.exports.signUp=function(req,res){
    
}
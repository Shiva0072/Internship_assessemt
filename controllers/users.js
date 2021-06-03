const mongoose=require("mongoose");
mongoose.set('useFindAndModify', false);
const todos=require("../models/user_todo");
const Users=require("../models/user_schema");

module.exports.profile=function(req,res){
    if(!req.user) {return  res.redirect("/");}
    // console.log("printing fromthe profile : ", req.user);
    const user_id=req.user._id;
    const user_name=req.user.name;
    todos.find({user:user_id},function(err,docs){
        if(err){
            console.log("Error in finding the documents");
            return;
        }
        return res.render("profile",{ 
            title:"TODO List of the User",
            name:user_name,
            todos:docs
        });
    });
};

module.exports.createSession=function(req,res){
    // return res.redirect("/users/profile");
    // return res.render("profile");
    return res.redirect("/");
}

module.exports.destroySession=function(req,res){
    try{
        // console.log(req.logout());
        req.logout();
        res.clearCookie('connect.sid', { path: '/' });
    }
    catch(err){
        console.log(err);
    }
    // req.session.destroy();
    res.redirect("/");
}

module.exports.check_todo_empty=function(req,res,next){
    if(!req.body.todo){
        return res.redirect("back");
    }
    next();
}

module.exports.createTodo=function(req,res){
    if(!req.user) {return  res.redirect("/");}

    const id=req.user._id;
    todos.create({
        todo:req.body.todo,
        user:id,
    },function(err,doc){
        if(err){console.log("error in creating the user's todo "); return;}
        return res.redirect("back");
    });
}

module.exports.delete=function(req,res){
    // let id=req.query.todoId;
    let id=req.params.todoId;
    console.log("deleted id : ",req.params);
    console.log("deleted id : ",req.params.todoId);
    todos.findOneAndDelete({_id:id},function(err,doc){
        if(err){
            console.log("Error in deleting the doc");
            return;
        }
        return res.redirect("back");
    });
}



module.exports.update_1=function(req,res){
    let id=req.params.todoId;
    todos.findById(id,function(err,doc){
        if(err){
            console.log("Error in finding the doc");
            return;
        }
        return res.render("edit_todo",{
            id:id,
            todo:doc
        });
    });


};

module.exports.update_2=function(req,res){
    let id=req.params.todoId;
    let todo=req.body.updated_todo;
    // console.log("Id  : ",req.params.id);
    // console.log("from 2nd update",req.body);
    todos.findByIdAndUpdate(id,{todo:todo},function(err,doc){
        if(err){
            console.log("Error in updating the doc!");
            return;
        }
        return res.redirect("/users/profile");
    });
}


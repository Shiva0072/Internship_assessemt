const express=require('express');
const cookieParser=require("cookie-parser") //reading and writing the cookies
const expressLayouts = require('express-ejs-layouts');
const port=8005;
const app=express();
//authentication and authrization
const session=require('express-session'); //for session cookie
const passport=require("passport");
const passportLinkedIn=require("./config/passport");
const db=require("./config/mongoose");

app.use(express.urlencoded());
app.use(cookieParser()); 
app.use(express.static("./assets"));

//set the layouts
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting the views
app.set("view engine", "ejs");
app.set("views","./views");

app.use(session({
    name:"User",
    secret:"todosecret",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100) //100 mins
    }
}));

app.use(passport.initialize());//tell the app to use it
app.use(passport.session()); 

app.use(passport.setAuthenticatedUser);

app.use("/",require("./routes"));

app.listen(port,function(err){
    if(err){console.log("error in server", err); return;}

    console.log("Server is Up and running");
});

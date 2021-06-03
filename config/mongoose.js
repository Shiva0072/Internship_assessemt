const mongoose=require("mongoose");

// mongoose.connect("mongodb://localhost:27017/Todos");
mongoose.connect("mongodb+srv://AssessMe:Shivam@123@cluster0.m6ojx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db=mongoose.connection;

// db.on('error',console.error.bind(console,'connection error : '));
db.once('open',function(){
    console.log("DB server is up and running ");
});
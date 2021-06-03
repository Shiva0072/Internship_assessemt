const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    user_id:String,
    name:{
        type:String,
        required : true
    },
    email:{
        type:String
    },
    password: {
        type: String,
        required: true
    },
    content:{
        type:String
    }
},{
    timestamps:true
});

//creating the model [a collection of collection[ : a collection of docs]]
const userSchema=mongoose.model('userSchema',UserSchema);

module.exports=userSchema;
const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    user_id :String,
    name:{
        type:String,
        required : true
    },
    email:{
        type:String
    }
},{
    timestamps:true
});

const userSchema=mongoose.model('userSchema',UserSchema);

module.exports=userSchema;
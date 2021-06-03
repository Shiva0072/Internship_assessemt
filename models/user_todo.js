const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const UserTodo=new mongoose.Schema({
    todo:{
        type:String
    },
    user:{
        type:ObjectId,
        ref:"userSchema"
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const userTodo=mongoose.model('UserTodo',UserTodo);

module.exports=userTodo;
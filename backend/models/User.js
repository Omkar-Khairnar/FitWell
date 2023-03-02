const mongoose=require('mongoose')
const { Schema } = mongoose;

const UserSchema= new Schema({
    name:{ 
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    DateOfJoin:{
        type:Date,
        default:Date.now
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    }
})

let user=mongoose.model('user', UserSchema)

module.exports=user
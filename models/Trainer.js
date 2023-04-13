const mongoose=require('mongoose');
const Schema=mongoose.Schema

const TrainerSchema=new Schema({
    image:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true, 
    },
    email:{ 
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true
    },
    DateOfJoin:{
        type:Date,
        default:Date.now,
    }
})

let trainer=mongoose.model('trainer', TrainerSchema)

module.exports=trainer
const mongoose=require('mongoose');
const Schema=mongoose.Schema


const Trainer=new Schema({
    image:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    }
})

let trainer=mongoose.model('trainer', Trainer)

module.exports=trainer
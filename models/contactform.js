const mongoose=require('mongoose')
const { Schema } = mongoose;

const ContactSchema= new Schema({
    name:{ 
        type:String,
        required:true,
    },  
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

let contactform=mongoose.model('contactform', ContactSchema)

module.exports=contactform
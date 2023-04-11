const mongoose=require('mongoose')
const { Schema } = mongoose;

const AdminSchema=new Schema({
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
    }
})

let admin=mongoose.model('admin',AdminSchema);
module.exports=admin
const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const ProductSchema=new Schema({
    image:{
        type:String, 
        required:true,
    },
    name:{
        type:String,
        required:true, 
    },
    description:{
        type:String,
        default:"Healthy Gym Product",
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
   
})

let product=mongoose.model('product',ProductSchema)

module.exports=product

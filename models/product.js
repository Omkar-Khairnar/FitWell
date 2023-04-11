const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const ProductSchema=new Schema({
    image:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        default:"Healthy Gym Product",
    },
   
})

let product=mongoose.model('product',ProductSchema)

module.exports=product

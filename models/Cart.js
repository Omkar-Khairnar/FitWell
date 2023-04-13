const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const CarttSchema=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    productid:{
        type:String,
        required:true,
    }, 
    // image:{
    //     type:String,
    //     required:true,
    // },
    // DateofInclusion:{
    //     type:Date,
    //     default:Date.now,
    // },
    // price:{ 
    //     type:Number,
    //     required:true,
    // },
    // description:{
    //     type:String,
    //     default:"Healthy Gym Product",
    // },
})

let cart=mongoose.model('cart',CarttSchema)

module.exports=cart

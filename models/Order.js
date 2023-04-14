const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const OrderSchema=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    name:{
        type:String,
      },
    image:{
        data: Buffer,
        contentType: String,
    },
    Dateoforder:{
        type:Date, 
        default:Date.now,
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:"InProgress",
    },
    description:{
        type:String,
        default:"Healthy Gym Product",
    },
    address:{
        type:String,
        required:true,
    }  
})

let order=mongoose.model('order',OrderSchema)

module.exports=order

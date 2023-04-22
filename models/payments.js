const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const PaymentSchema=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    Dateoforder:{
        type:Date, 
        default:Date.now,
    },
    amount:{
        type:Number,
        required:true,
    },
    paymentmethod:{
        type:String,
        default:"Card",
    },
    description:{
        type:String,
        default:"Credit",
    },
    status:{
        type:String,
        default:"Completed",
    }, 
})

let payment=mongoose.model('payments',PaymentSchema)

module.exports=payment

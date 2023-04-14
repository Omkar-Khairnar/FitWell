const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true, 
    },  
    description:{
        type:String, 
        default:"Healthy Gym Product",
    },
    price:{
        type:Number,
        // required:true,
    },
    category:{
        type:String,
        // required:true,
    },
    img:
    {
        data: Buffer,
        contentType: String,
        // required:true,

    }
   
})

module.exports=mongoose.model('product',productSchema);

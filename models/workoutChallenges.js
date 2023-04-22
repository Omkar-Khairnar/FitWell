const mongoose=require('mongoose')

const challengesSchema=new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String,
    },
    decription:{
        type:String,
    }
})
let challenges = mongoose.model('product',challengesSchema);
module.exports= challenges;

const mongoose=require('mongoose')

const challengesSchema=new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String,
    },
    description:{
        type:String,
    }
})
let challenges = mongoose.model('challenge',challengesSchema);
module.exports= challenges;

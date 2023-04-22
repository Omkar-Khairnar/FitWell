const mongoose=require('mongoose')

const workoutSchema=new mongoose.Schema({
    img1:
    {
        data: Buffer,
        contentType: String,
    },
    img2:
    {
        data: Buffer,
        contentType: String,
    },
    img3:
    {
        data: Buffer,
        contentType: String,
    },
    img4:
    {
        data: Buffer,
        contentType: String,
    },
    img5:
    {
        data: Buffer,
        contentType: String,
    },
    decription:{
        type:String,
    }
})
let workout = mongoose.model('product',workoutSchema);
module.exports= workout;

const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const ReviewSchema=new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
    }, 
    image:{
        type:String,
        default:"https://www.clipartmax.com/png/middle/91-915439_to-the-functionality-and-user-experience-of-our-site-red-person-icon.png",
    },
    name:{
        type:String,
        default:"username",
    },
    comment:{
        type:String,
        required:true,
    }
})


let review=mongoose.model('review',ReviewSchema)

module.exports=review

const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    
    description: {
        type: String,
    },
    img: {
        img0:
        {
            data: Buffer,
            contentType: String,
        },
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
        }
    }
})
let workout = mongoose.model('workout', workoutSchema);
module.exports = workout;

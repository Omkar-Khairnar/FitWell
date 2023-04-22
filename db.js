const mongoose=require('mongoose')
mongoose.set('strictQuery', false);
require('dotenv').config()
const mongoURI=process.env.mongoURI

const connectToMongo=()=>{
    mongoose
    .connect(mongoURI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log('MongoDB Database connected!'))
    .catch((err) => console.log(err))
}

module.exports=connectToMongo
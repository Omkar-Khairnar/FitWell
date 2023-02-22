const mongoose=require('mongoose')
mongoose.set('strictQuery', false);
const mongoURI='mongodb+srv://Omkar_FitWell:Omkar158@fitwelldatabase.njyspot.mongodb.net/?retryWrites=true&w=majority'

const connectToMongo=()=>{
    mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err))
}

module.exports=connectToMongo
const connectToMongo=require('./db')
const express=require('express')
connectToMongo();

const app=express();
var cors=require('cors')
const PORT=5000;

app.use(cors())

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use(express.json())

// app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })
const connectToMongo=require('./db')
const express=require('express')
var cors=require('cors')
connectToMongo();

const app=express();

const PORT=5000;
app.set('view engine', 'ejs');
app.use(cors())
app.use(express.static('public'))
app.use(express.json());

app.get('/', (req,res)=>{
   res.render('home')
})

app.get('/footer', (req,res)=>{
    res.render('footer')
})
app.get('/products', (req,res)=>{
    res.render('products')
})


app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })

const connectToMongo=require('./db')
const express=require('express')
var cors=require('cors')
const db = require("./data/sqlite_db");
// connectToMongo();

const app=express();
app.use(express.urlencoded({extended: true}))

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
app.get('/signin', (req,res)=>{
    res.render('signup_signin')
})
app.get('/about', (req,res)=>{
    res.render('about')
})
app.get('/reviews', (req,res)=>{
    res.render('reviews')
})
app.get('/classes', (req,res)=>{
    res.render('classes')
})
app.get('/services', (req,res)=>{
    res.render('services')
})
app.get('/contact', (req,res)=>{
    res.render('contact')
})

app.get('/user_Dashboard_home', (req,res)=>{
    res.render('user_Dashboard_home')
})
app.get('/user_Dashboard_myorders', (req,res)=>{
    res.render('user_Dashboard_myorders')
})
app.get('/user_Dashboard_payment', (req,res)=>{
    res.render('user_Dashboard_payment')
})
app.get('/user_Dashboard_reviews', (req,res)=>{
    res.render('user_Dashboard_reviews')
})
app.get('/user_Dashboard_cart', (req,res)=>{
    res.render('user_Dashboard_cart')
})
app.get('/user_Dashboard_profile', (req,res)=>{
    res.render('user_Dashboard_profile')
})

app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })

const express=require('express');
const connectToMongo=require('./db')
const app=express();
let alert=require('alert')
const PORT=5000;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User=require('./models/User')
const ReviewSchema=require('./models/review')
const TrainerSchema=require('./models/Trainer')
const ContactFormSchema=require('./models/contactform')
const session=require('express-session')
const cookieParser=require('cookie-parser')
require('dotenv').config();

//Connection to MongoDB
connectToMongo();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {  
        // secure: true,
        maxAge:86400000, //1 Day expiry
    }
  })) 
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
    res.render('signin', {error: 0})
})


app.get('/signup', (req,res)=>{
    res.render('signup')
})

app.get('/adminlogin', (req,res)=>{
    res.render('adminlogin',{error:0})
})

app.get('/about', (req,res)=>{
    res.render('about')
})
app.get('/reviews', async(req,res)=>{
    try{
        const reviews=await ReviewSchema.find();
        return res.render('reviews',{reviews})       
    }
    catch(err){
        res.status(404).json({Error:err})
    }
})
app.get('/centres', (req,res)=>{
    res.render('centres')
})
app.get('/services', (req,res)=>{
    res.render('services')
})
app.get('/contact', (req,res)=>{
    res.render('contact')
})
app.get('/user_Dashboard_home', (req,res)=>{
    if(!req.session.userDetails){
        return res.redirect('/signin')
    }
    const userDetails=req.session.userDetails;
    res.render('user_Dashboard_home',{userDetails})
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
app.get('/user_dashboard_workout', (req,res)=>{
    res.render('user_dashboard_workout')
})
app.get('/user_Dashboard_challenges', (req,res)=>{
    res.render('user_dashboard_challenges')
})
app.get('/user_Dashboard_profile', (req,res)=>{
    const userDetails=req.session.userDetails;
    res.render('user_Dashboard_profile', {userDetails})
})
app.get('/user_dashboard_navbar', (req,res)=>{
    res.render('user_dashboard_navbar')
})
app.get('/user_dashboard_chat', (req,res)=>{
    res.render('user_dashboard_chat')
})
app.get('/user_dashboard_chat', (req,res)=>{
    res.render('user_dashboard_chat')
})
app.get('/timer', (req,res)=>{
    res.render('timer')
})
app.get('/admin_dashboard_side_wrapper', (req,res)=>{
    res.render('admin_dashboard_side_wrapper')
})
app.get('/admin_dashboard_top_wrapper', (req,res)=>{
    res.render('admin_dashboard_top_wrapper')
})
app.get('/admin_dashboard_home', (req,res)=>{
    res.render('admin_dashboard_home')
})
app.get('/admin_dashboard_customers', async(req,res)=>{
    try{
        const users=await User.find();
        return res.render('admin_dashboard_customers',{users})      
    }
    catch(err){
        res.status(404).json({Error:err})
    }
    
})
app.get('/admin_dashboard_trainers', async(req,res)=>{
    try{
        const trainers=await TrainerSchema.find();
        return res.render('admin_dashboard_trainers',{trainers})
    }
    catch(err){
        res.status(404).json({Error:err})
    }
    res.render('admin_dashboard_trainers')
}) 
app.get('/admin_dashboard_payment', (req,res)=>{
    res.render('admin_dashboard_payment')
})
app.get('/admin_dashboard_add_product', (req,res)=>{
    res.render('admin_dashboard_add_product')
})
app.get('/admin_Dashboard_order', (req,res)=>{
    res.render('admin_Dashboard_order')
})
app.get('/payment', (req,res)=>{
    res.render('payment')
})
app.get('/admin_dashboard_feedback', async(req,res)=>{
    try{
        const feedbacks=await ContactFormSchema.find();
        return res.render('admin_dashboard_feedback', {feedbacks})     
    }
    catch(err){
        res.status(404).json({Error:err})
    }
})
app.get('/userlogout', async(req,res)=>{
    req.session.destroy();
    return res.redirect('/');
})


app.post('/signup',async(req, res)=>{
    let success=false;
    try{
        let prevuser=await User.findOne({email:req.body.email})
        if(prevuser){
            alert('Email Id already Exists. Please Log in into registered account');
           return  res.redirect('/signin')
        }
         
        const pass=req.body.password;
        const salt=await bcrypt.genSaltSync(10);
        const secpass=await bcrypt.hashSync(pass, salt);

        let user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secpass,
            age:req.body.age,
            gender:req.body.gender,
            weight:req.body.weight,
            height:req.body.height,
            image:req.body.image,
        })
        const data={
            user:{
                id:user.id,
            }
        }
        var authtoken=jwt.sign(data, process.env.JWT_SECRET);
        success=true;
        // res.status(200).json({messag:'User Created Successfully'})
        res.redirect('/signin')
    }
    catch(err){
        res.status(500).json({Error:err.message})
        console.log(err);
    }
})

app.post('/signin', async(req, res)=>{
    var email=req.body.email;
    var password=req.body.password;
    let success=false;
try{
    console.log(email);
    let user=await User.findOne({email:email});
    if(!user){
       return  res.render('signin', {error: 1})
    }
    const comparePassword=await bcrypt.compare(password, user.password);

    if(!comparePassword){
       return res.render('signin', {error: 1})      
    }
    const data={
        user:{
            id:user.id,
        }
    }
    var authtoken=await jwt.sign(data, process.env.JWT_SECRET);
    if(authtoken){
        success=true;
    }
    const userDetails={
        id:user._id,
        name:user.name,
        email:user.email,
        age:user.age,
        gender:user.gender,
        weight:user.weight,
        height:user.height,
        image:user.image,
        DateOfJoin:user.DateOfJoin,
    }
    req.session.userDetails=userDetails;
    req.session.userjwtoken=authtoken;
    req.session.save(); 
   return res.redirect('/user_Dashboard_home')
}
catch(err){
    console.log(err);
    res.status(400).json({Error:err})
}
}) 


app.use('/useractions', require('./routes/userActions'))
app.use('/adminactions', require('./routes/adminActions'))
// app.use('/user_Dashboard', require('./routes/'))

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })


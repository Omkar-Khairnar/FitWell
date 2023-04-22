const express = require('express');
const connectToMongo = require('./db')
const app = express();
let alert = require('alert') 
const PORT = 5000;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const session = require('express-session')
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
const ProductSchema = require('./models/product');
const ReviewSchema = require('./models/review');
const TrainerSchema = require('./models/Trainer');
const CartSchema = require('./models/Cart');
const OrderSchema = require('./models/Order');
const ContactFormSchema = require('./models/contactform');
const PaymentSchema=require('./models/payments')



require('dotenv').config();

//Connection to MongoDB
connectToMongo();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: true,
        maxAge: 86400000, //1 Day expiry
    }
}))


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

app.post('/newProduct',upload.single('productImage'),(req,res) =>  {
    // var cat = req.body.category;
    var obj = {
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        img : {
            data: fs.readFileSync(path.join(__dirname + '/public/uploads/'+ req.file.filename)),
            contentType: 'image/png'
        }
    }
    productSchema.create(obj).then((err,item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/admin_dashboard_add_product');
            // console.log("great job !!");
        }
    });
});
app.post('/newChallenge',upload.single('challengeImg'),(req,res) =>  {
    // var cat = req.body.category;
    var obj = {
        description : req.body.description,
        img : {
            data: fs.readFileSync(path.join(__dirname + '/public/uploads/'+ req.file.filename)),
            contentType: 'image/png'
        }
    }
    productSchema.create(obj).then((err,item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/admin_dashboard_home');
            // console.log("great job !!");
        }
    });
});
 
app.get('/', (req, res) => {
    const userDetails=req.session.userDetails;
    var loginStatus=1;
    if(!userDetails){
        loginStatus=0;
    }
    res.render('home',{loginStatus})
})
app.get('/footer', (req, res) => {
    res.render('footer')
})
app.get('/productSearch', async(req, res) => {
    const userDetails=req.session.userDetails;
    var loginStatus=1;
    if(!userDetails){
        loginStatus=0;
    }
    res.render('productSearch',{loginStatus})
})
app.get('/products', async(req, res) => {
    
    const LatestCategory= await ProductSchema.find().sort({_id:-1}).limit(15);
    const NutrientsCategory = await ProductSchema.find({category : 'Nutrients'}).sort({_id:-1}).limit(15);
    const ProteinCategory = await ProductSchema.find({category : 'Whey Proteins'}).sort({_id:-1}).limit(15);
    const EnergyCategory = await ProductSchema.find({category : 'Energy & Endurance'}).sort({_id:-1}).limit(15);
    const RecoveryCategory = await ProductSchema.find({category : 'Recovery & Repair'}).sort({_id:-1}).limit(15);        const userDetails=req.session.userDetails;
    var loginStatus=1;
    if(!userDetails){
        loginStatus=0;
    }

    res.render('products', { LatestCategory, NutrientsCategory, ProteinCategory, EnergyCategory, RecoveryCategory,loginStatus})
})
app.post('/productSearchResult',async(req, res)=>{
    const search = req.body.search;
    searchQuery = { name: { $regex: search, $options: 'i' } }
    const searchResult = await ProductSchema.find(searchQuery).sort({price:1});
    const searchResultCount = await ProductSchema.find(searchQuery).sort({price:1}).count();
    const userDetails=req.session.userDetails;
    var loginStatus=1;
    if(!userDetails){
        loginStatus=0;
    }
    res.render('productSearch',{searchResult,searchResultCount,loginStatus});

});
// app.post('/productFiltersResult',async(req, res)=>{
//     const search = req.body.filter;
//     searchQuery = { name: { $regex: search, $options: 'i' } }
//     const searchResult = await ProductSchema.find(searchQuery).sort({price:1});
//     const searchResultCount = await ProductSchema.find(searchQuery).sort({price:1}).count();
//     res.render('productSearch',{searchResult,searchResultCount});

// });


app.get('/signin', (req, res) => {
    res.render('signin', { error: 0 })
})


app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/adminlogin', (req, res) => {
    res.render('adminlogin', { error: 0 })
})

app.get('/about', async(req, res) => {
    try{
        const userDetails=req.session.userDetails;
    var loginStatus=1;
    if(!userDetails){
        loginStatus=0;
    }
    const trainers=await TrainerSchema.find().limit(4);
    res.render('about',{loginStatus,trainers})
    }
    catch(err){
        console.log(err);
    }
    
})
app.get('/reviews', async (req, res) => {
    const userDetails=req.session.userDetails;
    var loginStatus=1;
    if(!userDetails){
        loginStatus=0;
    }
    try {
        const reviews = await ReviewSchema.find();
        return res.render('reviews', { reviews,loginStatus })
    }
    catch (err) {
        res.status(404).json({ Error: err })
    }
})
app.get('/centres', (req, res) => {
    const userDetails=req.session.userDetails;
    var loginStatus=1;
    if(!userDetails){
        loginStatus=0;
    }
    res.render('centres',{loginStatus})
})
app.get('/services', (req, res) => {
    const userDetails=req.session.userDetails;
    var loginStatus=1;
    if(!userDetails){
        loginStatus=0;
    }
    res.render('services',{loginStatus})
})
app.get('/contact', (req, res) => {
    const userDetails=req.session.userDetails;
    var loginStatus=1;
    if(!userDetails){
        loginStatus=0;
    }
    res.render('contact',{loginStatus})
})
app.get('/user_Dashboard_home', (req, res) => {
    if (!req.session.userDetails) {
        return res.redirect('/signin')
    }
    const userDetails = req.session.userDetails;
    res.render('user_Dashboard_home', { userDetails })
})
app.get('/user_Dashboard_myorders', async(req, res) => {
    if (!req.session.userDetails) {
        return res.redirect('/signin')
    }
    const userDetails = req.session.userDetails;
    const userid=userDetails.id;
    const orders=await OrderSchema.find({user:userid});
    res.render('user_Dashboard_myorders', {orders})
})
app.get('/user_Dashboard_payment', (req, res) => {
    res.render('user_Dashboard_payment')
})
app.get('/user_Dashboard_reviews', (req, res) => {
    res.render('user_Dashboard_reviews')
})
app.get('/user_Dashboard_cart', async(req, res) => {
    if (!req.session.userDetails) {
        return res.redirect('/signin')
    }
    const userDetails = req.session.userDetails;
    const userid=userDetails.id;
    const productsinfo=await CartSchema.find({user:userid});
    const products = []; 
    await Promise.all(productsinfo.map(async (product) => {
    const pid = product.productid;
    const item = await productSchema.find({ _id: pid });
    products.push(item);
    })); 
    req.session.products=products;
    
    res.render('user_Dashboard_cart', { userDetails,products})
})
app.get('/user_dashboard_workout', (req, res) => {
    res.render('user_dashboard_workout')
})
app.get('/user_Dashboard_challenges', (req, res) => {
    res.render('user_dashboard_challenges') 
})
app.get('/user_Dashboard_profile', (req, res) => {
    if (!req.session.userDetails) {
        return res.redirect('/signin')
    }
    const userDetails = req.session.userDetails;
    res.render('user_Dashboard_profile', { userDetails })
})
app.get('/user_dashboard_navbar', (req, res) => {
    res.render('user_dashboard_navbar') 
})
// app.get('/user_dashboard_chat', (req,res)=>{
//     res.render('user_dashboard_chat')
// })

app.get('/timer', (req, res) => {
    res.render('timer')
})
app.get('/admin_dashboard_side_wrapper', (req, res) => {
    res.render('admin_dashboard_side_wrapper')
})
app.get('/admin_dashboard_top_wrapper', (req, res) => {
    res.render('admin_dashboard_top_wrapper')
})
app.get('/admin_dashboard_home', (req, res) => {
    res.render('admin_dashboard_home')
})
app.get('/admin_dashboard_customers', async (req, res) => {
    try {
        const users = await User.find();
        return res.render('admin_dashboard_customers', { users })
    }
    catch (err) {
        res.status(404).json({ Error: err })
    }

})
app.get('/admin_dashboard_trainers', async (req, res) => {
    try {
        const trainers = await TrainerSchema.find();
        return res.render('admin_dashboard_trainers', { trainers })
    }
    catch (err) {
        res.status(404).json({ Error: err })
    }
    res.render('admin_dashboard_trainers')
})
app.get('/admin_dashboard_payment', async(req, res) => {
    try{
        const payments=await PaymentSchema.find().sort({_id:-1});
        return res.render('admin_dashboard_payment',{payments});
    }
    catch(err){
        console.log(err);
        res.status(400).json({Error:err});
    }
})
app.get('/admin_dashboard_add_product', (req, res) => {
    res.render('admin_dashboard_add_product')
})
app.get('/admin_Dashboard_order', async(req, res) => {
    try{
        const orders=await OrderSchema.find().sort({_id:-1});
        res.render('admin_Dashboard_order',{orders})
    }
    catch(err){
        res.status(400).json({Error:err})
    }
    
})
app.get('/payment', (req, res) => {
    res.render('payment')
})
app.get('/admin_dashboard_feedback', async (req, res) => {
    try {
        const feedbacks = await ContactFormSchema.find();
        return res.render('admin_dashboard_feedback', { feedbacks })
    }
    catch (err) {
        res.status(404).json({ Error: err })
    }
})
app.get('/userlogout', async (req, res) => {
    req.session.destroy();
    return res.redirect('/');
})


app.post('/signup', async (req, res) => {
    let success = false;
    try {
        let prevuser = await User.findOne({ email: req.body.email })
        if (prevuser) {
            alert('Email Id already Exists. Please Log in into registered account');
            return res.redirect('/signin')
        }

        const pass = req.body.password;
        const salt = await bcrypt.genSaltSync(10);
        const secpass = await bcrypt.hashSync(pass, salt);

        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
            age: req.body.age,
            gender: req.body.gender,
            weight: req.body.weight,
            height: req.body.height,
            image: req.body.image,
        })
        const data = {
            user: {
                id: user.id,
            }
        }
        var authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        // res.status(200).json({messag:'User Created Successfully'})
        res.redirect('/signin')
    }
    catch (err) {
        res.status(500).json({ Error: err.message })
        console.log(err);
    }
})

app.post('/signin', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    let success = false;
    try {
        console.log(email);
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.render('signin', { error: 1 })
        }
        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.render('signin', { error: 1 })
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        var authtoken = await jwt.sign(data, process.env.JWT_SECRET);
        if (authtoken) {
            success = true;
        }
        const userDetails = {
            id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            weight: user.weight,
            height: user.height,
            image: user.image,
            DateOfJoin: user.DateOfJoin,
        }
        req.session.userDetails = userDetails;
        req.session.save();
        return res.redirect('/user_Dashboard_home')
    }

    catch (err) {
    console.log(err);
    res.status(400).json({ Error: err })
}
});

app.use('/useractions', require('./routes/userActions'))
app.use('/adminactions', require('./routes/adminActions'))
// app.use('/user_Dashboard', require('./routes/'))
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})


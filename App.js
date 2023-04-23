const express = require('express');
const mongoose = require('mongoose');
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
const ProductSchema = require('./models/product');
const challengesSchema = require('./models/workoutChallenges')
const WorkoutSchema = require('./models/HomeWorkout')
const ReviewSchema = require('./models/review');
const TrainerSchema = require('./models/Trainer');
const CartSchema = require('./models/Cart');
const OrderSchema = require('./models/Order');
const ContactFormSchema = require('./models/contactform');
const PaymentSchema = require('./models/payments')



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

app.get('/', (req, res) => {
    const userDetails = req.session.userDetails;
    var loginStatus = 1;
    if (!userDetails) {
        loginStatus = 0;
    }
    res.render('home', { loginStatus })
})
app.get('/footer', (req, res) => {
    res.render('footer')
})
app.get('/productSearch', async (req, res) => {
    const userDetails = req.session.userDetails;
    var loginStatus = 1;
    if (!userDetails) {
        loginStatus = 0;
    }
    res.render('productSearch', { loginStatus })
})
app.get('/products', async (req, res) => {

    const LatestCategory = await ProductSchema.find().sort({ _id: -1 }).limit(15);
    const NutrientsCategory = await ProductSchema.find({ category: 'Nutrients' }).limit(20);
    const ProteinCategory = await ProductSchema.find({ category: 'Whey Proteins' }).limit(20);
    const EnergyCategory = await ProductSchema.find({ category: 'Energy & Endurance' }).limit(15);
    const RecoveryCategory = await ProductSchema.find({ category: 'Recovery & Repair' }).limit(13); const userDetails = req.session.userDetails;
    var loginStatus = 1;
    if (!userDetails) {
        loginStatus = 0;
    }

    res.render('products', { LatestCategory, NutrientsCategory, ProteinCategory, EnergyCategory, RecoveryCategory, loginStatus })
})

app.post('/productSearchResult',async(req, res)=>{
    const filter = req.body.filter;
    const search = req.body.search;
    var searchResult;
    var searchResultCount
    
    if(filter == 'pricelow' || filter == ""){
        searchQuery = { name: { $regex: search, $options: 'i' } };
         searchResult = await ProductSchema.find(searchQuery).sort({price:1});
         searchResultCount = await ProductSchema.find(searchQuery).sort({price:1}).count();
    }else if(filter == 'pricehigh'){
        searchQuery = { name: { $regex: search, $options: 'i' } };
         searchResult = await ProductSchema.find(searchQuery).sort({price:-1});
         searchResultCount = await ProductSchema.find(searchQuery).sort({price:-1}).count();
    }else if(filter == 'energy'){
        searchQuery = { name: { $regex: search, $options: 'i' },category: 'Energy & Endurance' };
         searchResult = await ProductSchema.find(searchQuery);
         searchResultCount = await ProductSchema.find(searchQuery).count();
    }else if(filter == 'nutrients'){
        searchQuery = { name: { $regex: search, $options: 'i' },category: 'Nutrients' };
         searchResult = await ProductSchema.find(searchQuery);
         searchResultCount = await ProductSchema.find(searchQuery).count();
    }else if(filter == 'repair'){
        searchQuery = { name: { $regex: search, $options: 'i' },category: 'Recovery & Repair' };
         searchResult = await ProductSchema.find(searchQuery);
         searchResultCount = await ProductSchema.find(searchQuery).count();
    }else{
        searchQuery = { name: { $regex: search, $options: 'i' },category: 'Whey Proteins' };
         searchResult = await ProductSchema.find(searchQuery);
         searchResultCount = await ProductSchema.find(searchQuery).count();
    }

    const userDetails = req.session.userDetails;
    var loginStatus = 1;
    if (!userDetails) {
        loginStatus = 0;
    }
    res.render('productSearch', { searchResult, searchResultCount, loginStatus, search, filter});
    
    
});

app.get('/signin', (req, res) => {
    res.render('signin', { error: 0 })
})


app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/adminlogin', (req, res) => {
    res.render('adminlogin', { error: 0 })
})

app.get('/about', async (req, res) => {
    try {
        const userDetails = req.session.userDetails;
        var loginStatus = 1;
        if (!userDetails) {
            loginStatus = 0;
        }
        const trainers = await TrainerSchema.find().limit(4);
        res.render('about', { loginStatus, trainers })
    }
    catch (err) {
        console.log(err);
    }

})
app.get('/reviews', async (req, res) => {
    const userDetails = req.session.userDetails;
    var loginStatus = 1;
    if (!userDetails) {
        loginStatus = 0;
    }
    try {
        const reviews = await ReviewSchema.find();
        return res.render('reviews', { reviews, loginStatus })
    }
    catch (err) {
        res.status(404).json({ Error: err })
    }
})
app.get('/centres', (req, res) => {
    const userDetails = req.session.userDetails;
    var loginStatus = 1;
    if (!userDetails) {
        loginStatus = 0;
    }
    res.render('centres', { loginStatus })
})
app.get('/services', (req, res) => {
    const userDetails = req.session.userDetails;
    var loginStatus = 1;
    if (!userDetails) {
        loginStatus = 0;
    }
    res.render('services', { loginStatus })
})


app.get('/contact', (req, res) => {
    const userDetails = req.session.userDetails;
    var loginStatus = 1;
    if (!userDetails) {
        loginStatus = 0;
    }
    res.render('contact', { loginStatus })
})
app.get('/user_Dashboard_home', async(req, res) => {
    if (!req.session.userDetails) {
        return res.redirect('/signin')
    }
    const userDetails = req.session.userDetails;
    const userid=userDetails.id;
    const uID = new mongoose.Types.ObjectId(userid);
    const Numoforders=await OrderSchema.count({user:userid});
    const Numofreviews=await ReviewSchema.count({user:userid});
    const revenue = await OrderSchema.aggregate([
        {
            $match: { user: uID }
        },
        {
          $group: {
            _id: null,
            totalamount: { $sum: "$amount" }
          }
        }
      ]);
    var totalamount =0;
    if (revenue.length > 0){
        totalamount = revenue[0].totalamount;
    }
    res.render('user_Dashboard_home', { userDetails,Numoforders,Numofreviews,totalamount })
})
app.get('/user_Dashboard_myorders', async (req, res) => {
    if (!req.session.userDetails) {
        return res.redirect('/signin')
    }
    const userDetails = req.session.userDetails;
    const userid = userDetails.id;
    const uID = new mongoose.Types.ObjectId(userid);
    const orders = await OrderSchema.find({ user: uID }).sort({_id:-1});
    res.render('user_Dashboard_myorders', { orders })
})
app.get('/user_Dashboard_payment',async(req, res) => {
    if (!req.session.userDetails) {
        return res.redirect('/signin')
    }
    const userDetails = req.session.userDetails;
    const userid=userDetails.id;
    const payments=await PaymentSchema.find({user:userid});
    res.render('user_Dashboard_payment',{payments});
})
app.get('/user_Dashboard_reviews', (req, res) => {
    res.render('user_Dashboard_reviews')
})
app.get('/user_Dashboard_cart', async (req, res) => {
    if (!req.session.userDetails) {
        return res.redirect('/signin')
    }
    const userDetails = req.session.userDetails;
    const userid = userDetails.id;
    const productsinfo = await CartSchema.find({ user: userid });
    const products = [];
    await Promise.all(productsinfo.map(async (product) => {
    const pid = product.productid;
    const item = await ProductSchema.find({ _id: pid });
    products.push(item);
    })); 
    req.session.products=products;
    
    res.render('user_Dashboard_cart', { userDetails,products})
})

app.get('/user_dashboard_workout', async(req, res) => {
    const allWorkouts = await WorkoutSchema.find();
    res.render('user_dashboard_workout',{allWorkouts});

})
app.get('/user_Dashboard_challenges', async(req, res) => {
    const allChallenges = await challengesSchema.find();
    res.render('user_dashboard_challenges',{allChallenges});

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
app.get('/timer', (req, res) => {
    res.render('timer')
})
app.get('/admin_dashboard_side_wrapper', (req, res) => {
    res.render('admin_dashboard_side_wrapper')
})
app.get('/admin_dashboard_top_wrapper', (req, res) => {
    res.render('admin_dashboard_top_wrapper')
})
app.get('/admin_dashboard_home', async(req, res) => {
    try{
        const payments= await PaymentSchema.find().sort({_id:-1}).limit(6);
        const orders=await OrderSchema.find().sort({_id:-1}).limit(6);
        const Numoftrainers=await TrainerSchema.count();
        const Numofusers=await User.count();
        const Numoforders=await OrderSchema.count();
        const revenue = await OrderSchema.aggregate([
            {
              $group: {
                _id: null,
                totalamount: { $sum: "$amount" }
              }
            }
          ]);
        const totalamount = revenue[0].totalamount;
        res.render('admin_dashboard_home',{payments,orders,Numoftrainers,Numofusers,Numoforders,totalamount});
        
    }
    catch(err){
        console.log(err);
    }
})
app.get('/admin_dashboard_customers', async (req, res) => {
    try {
        const users = await User.find().sort({_id:-1});
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
app.get('/admin_dashboard_payment', async (req, res) => {
    try {
        const payments = await PaymentSchema.find().sort({ _id: -1 });
        return res.render('admin_dashboard_payment', { payments });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ Error: err });
    }
})
app.get('/admin_dashboard_add_product', (req, res) => {
    res.render('admin_dashboard_add_product')
})
app.get('/admin_Dashboard_order', async (req, res) => {
    try {
        const orders = await OrderSchema.find().sort({ _id: -1 });
        res.render('admin_Dashboard_order', { orders })
    }
    catch (err) {
        res.status(400).json({ Error: err })
    }

})
app.get('/payment', (req, res) => {
    res.render('payment')
})
app.get('/admin_dashboard_feedback', async (req, res) => {
    try {
        const feedbacks = await ContactFormSchema.find().sort({_id:-1});
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
        const salt = bcrypt.genSaltSync(10);
        const secpass =  bcrypt.hashSync(pass, salt);

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
            expirydate:user.expirydate.toDateString(),
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
app.use('/adminauth', require('./routes/adminAuth'))


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})


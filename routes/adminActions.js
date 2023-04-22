const express=require('express')
const Trainer=require('../models/Trainer')
const Product=require('../models/product')
const User=require('../models/User')
const OrderSchema=require('../models/Order')
const Feedback=require('../models/contactform')
const router=express.Router() 
require('dotenv').config()
let alert=require('alert');
var fs = require('fs');
var multer = require('multer');
var path = require('path');

const ProductSchema = require('../models/product');
const challengesSchema = require('../models/workoutChallenges')
const WorkoutSchema = require('../models/HomeWorkout')



//Adding Trainer to Database : Admin Login required
router.post('/addTrainer', async(req,res)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const salary=req.body.salary;
        const gender=req.body.gender;
        const image=req.body.image;
    
        let trainer=await Trainer.create({
            name:name,
            email:email,
            salary:salary,
            image:image,
            gender:gender
        })
        // alert("Trainer Added Successfully.")
        res.redirect('/admin_dashboard_trainers');
    }
    catch(err){
        res.send(400).json({err})
    }
})

router.post('/deleteuser', async(req,res)=>{
    try{
        const userid=req.body.userid;
        let user=await User.findByIdAndDelete(userid);
        res.redirect('/admin_dashboard_customers')
    }
    catch(err){
        res.send(400).json({err})
    }
})
router.post('/deletetrainer', async(req,res)=>{
    try{
        const trainerid=req.body.trainerid;
        let trainer=await Trainer.findByIdAndDelete(trainerid);
        res.redirect('/admin_dashboard_trainers')
    }
    catch(err){
        res.send(400).json({err})
    }
})
router.post('/deleteorder', async(req,res)=>{
    try{
        const orderid=req.body.orderid;
        let order=await OrderSchema.findByIdAndDelete(orderid);
        res.redirect('/admin_dashboard_order')
    }
    catch(err){
        res.send(400).json({err})
    }
})
router.post('/deletefeedback', async(req,res)=>{
    try{ 
        const feedbackid=req.body.feedbackid;
        let feedback=await Feedback.findByIdAndDelete(feedbackid);
        res.redirect('/admin_dashboard_feedback')
    }
    catch(err){
        res.send(400).json({err})
    }
})



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });
router.post('/newProduct', upload.single('productImage'), (req, res) => {
    var obj = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/../public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    ProductSchema.create(obj).then((err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin_dashboard_add_product');
        }
    });
});
router.post('/newChallenge', upload.single('challengeImg'), (req, res) => {
    console.log("kartik :"+ fs.readFileSync(path.join(__dirname + '/../public/uploads/' + req.file.filename)));
    var obj = {
        description: req.body.ChallengeDescription,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/../public/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    challengesSchema.create(obj).then((err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin_dashboard_home');
        }
    });
});

var uploadsImages = multer({ storage: storage }).array('workoutImg', 5);
router.post('/newWorkout', uploadsImages, (req, res) => {
    var obj = {
        description: req.body.WorkoutDescription,
        img: {
            img0: {
                data: fs.readFileSync(path.join(__dirname + '/../public/uploads/' + req.files[0].filename)),
                contentType: 'image/png'
            },
            img1: {
                data: fs.readFileSync(path.join(__dirname + '/../public/uploads/' + req.files[1].filename)),
                contentType: 'image/png'
            },
            img2: {
                data: fs.readFileSync(path.join(__dirname + '/../public/uploads/' + req.files[2].filename)),
                contentType: 'image/png'
            },
            img3: {
                data: fs.readFileSync(path.join(__dirname + '/../public/uploads/' + req.files[3].filename)),
                contentType: 'image/png'
            },
            img4: {
                data: fs.readFileSync(path.join(__dirname + '/../public/uploads/' + req.files[4].filename)),
                contentType: 'image/png'
            }
        }
    }
    WorkoutSchema.create(obj).then((err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin_dashboard_home');
        }
    });
});


module.exports=router

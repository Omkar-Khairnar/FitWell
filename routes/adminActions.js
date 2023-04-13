const express=require('express')
const Trainer=require('../models/Trainer')
const Product=require('../models/product')
const User=require('../models/User')
const Feedback=require('../models/contactform')
const router=express.Router() 
require('dotenv').config()
let alert=require('alert')

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

module.exports=router

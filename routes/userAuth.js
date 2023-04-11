const express=require('express')
const User=require('../models/User')
const router=express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config() 
let alert=require('alert')


// Route 1: Sign Up(Create New User) :No Login required
router.post('/signup',async(req, res)=>{
    let success=false;
    try{
        let prevuser=await User.findOne({email:req.body.email})
        if(prevuser){
            alert('Email Id already Exists. Please Log in into registered account');
            // res.redirect('/signin')
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

// Route 2:Login a user using POST : No Login required
router.post('/signin', async(req, res)=>{
        var email=req.body.email;
        var password=req.body.password;
        let success=false;
    try{
        console.log(email);
        let user=await User.findOne({email:email});
        if(!user){
            res.render('signin', {error: 1})
        }
        const comparePassword=await bcrypt.compare(password, user.password);

        if(!comparePassword){
            res.render('signin', {error: 1})      
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
        res.cookie('jwtoken',authtoken,{
            expires:86400000,
            httpOnly:true,
        })
        res.render('/user_Dashboard_home')
    }
    catch(err){
        console.log(err);
        res.status(400).json({Error:err.message})
    }
})


module.exports=router
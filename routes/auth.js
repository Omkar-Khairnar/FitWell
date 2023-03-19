const express=require('express')
const User=require('../models/User')
const router=express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
 
const JWT_SECRET="FFSD_FITWELL_PROJECT";

//Route 1: Sign Up(Create New User) :No Login required
router.post('/createuser',async(req, res)=>{
    let success=false;
    try{
        let prevuser=await User.findOne({email:req.body.email})
        if(prevuser){
          return res.status(400).json({success:success, message:"Email ID already registerd. Please Login"});
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
            image:req.body.image,
        })

        const data={
            user:{
                id:user.id,
            }
        }

        var authtoken=jwt.sign(data, JWT_SECRET);
        success=true;
        console.log(authtoken);
        res.status(201).json({success:success, authtoken});
    }
    catch(err){
        res.status(500).json({Error:err.message})
        console.log(err);
    }
})

//Route 2:Login a user using POST : No Login required
router.post('/login', async(req, res)=>{
        var email=req.body.email;
        var password=req.body.password;
        let success=false;
    try{
        console.log(email);
        let user=await User.findOne({email:email});
        if(!user){
          return  res.status(400).json({success:success, message:"User Not Exist"})
        }
        const comparePassword=await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(400).json({success:success, message:"Please Login with Valid Credentials."})
        }
        const data={
            user:{
                id:user.id,
            }
        }
        var authtoken=await jwt.sign(data, JWT_SECRET);
        if(authtoken){
            success=true;
        }
        res.status(201).json({success, authtoken});
        // localStorage.setItem('authtoken', authtoken)
        // console.log(authtoken);
    }
    catch(err){
        console.log(err);
        res.status(400).json({Error:err.message})
    }
})



module.exports=router
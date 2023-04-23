const express=require('express')
const Admin=require('../models/Admin')
const router=express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
let alert=require('alert')


// Route 1:Login a admin using POST : No Login required
router.post('/adminlogin', async(req, res)=>{
    var email=req.body.email;
    var password=req.body.password;
    let success=false;
try{
    console.log(email);
    let admin=await Admin.findOne({email:email});
    if(!admin){
        res.render('adminlogin', {error: 1})
    }
    const comparePassword=await bcrypt.compare(password, admin.password);

    if(!comparePassword){
        res.render('adminlogin', {error: 1})      
    }
    const data={
        admin:{ 
            id:admin.id,
        }
    }
    var authtoken=await jwt.sign(data, process.env.JWT_SECRET);
    if(authtoken){
        success=true;
    }
    const adminDetails={
        name:admin.name,
        email:admin.email,
    }
    req.cookies.adminDetails=adminDetails;
    res.redirect('/admin_dashboard_home')
}
catch(err){
    console.log(err);
    res.status(400).json({Error:err.message})
}
})

//Route 2:Create Admin using Post
router.post('/createadmin',async(req, res)=>{
    let success=false;
    try{
        let prevadmin=await Admin.findOne({email:req.body.email})
        if(prevadmin){
            alert('Email Id already Exists.');
        }
        const pass=req.body.password;
        const salt=await bcrypt.genSaltSync(10);
        const secpass=await bcrypt.hashSync(pass, salt);
        
        let admin=await Admin.create({
            name:req.body.name,
            email:req.body.email,
            password:secpass,
           
        })
        const data={
            admin:{
                id:admin.id,
            }
        }
        var authtoken=jwt.sign(data, process.env.JWT_SECRET);
        success=true;
        // res.redirect('/signin')
        alert('Admin Registered Successfully!!!')
    }
    catch(err){
        res.status(500).json({Error:err.message})
        console.log(err);
    }
})

module.exports=router
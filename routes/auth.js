const express=require('express')
const User=require('../models/User')
const router=express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db=require('../data/sqlite_db')
const JWT_SECRET="FFSD_FITWELL_PROJECT";

//Route 1: Sign Up(Create New User) :No Login required
// router.post('/createuser',async(req, res)=>{
//     let success=false;
//     try{
//         let prevuser=await User.findOne({email:req.body.email})
//         if(prevuser){
//           return res.status(400).json({success:success, message:"Email ID already registerd. Please Login"});
//         }
         
//         const pass=req.body.password;
//         const salt=await bcrypt.genSaltSync(10);
//         const secpass=await bcrypt.hashSync(pass, salt);

//         let user=await User.create({
//             name:req.body.name,
//             email:req.body.email,
//             password:secpass,
//             age:req.body.age,
//             gender:req.body.gender,
//             image:req.body.image,
//         })

//         const data={
//             user:{
//                 id:user.id,
//             }
//         }

//         var authtoken=jwt.sign(data, JWT_SECRET);
//         success=true;
//         console.log(authtoken);
//         res.status(201).json({success:success, authtoken});
//     }
//     catch(err){
//         res.status(500).json({Error:err.message})
//         console.log(err);
//     }
// })

//Route 2:Login a user using POST : No Login required
// router.post('/login', async(req, res)=>{
//         var email=req.body.email;
//         var password=req.body.password;
//         let success=false;
//     try{
//         console.log(email);
//         let user=await User.findOne({email:email});
//         if(!user){
//           return  res.status(400).json({success:success, message:"User Not Exist"})
//         }
//         const comparePassword=await bcrypt.compare(password, user.password);

//         if(!comparePassword){
//             return res.status(400).json({success:success, message:"Please Login with Valid Credentials."})
//         }
//         const data={
//             user:{
//                 id:user.id,
//             }
//         }
//         var authtoken=await jwt.sign(data, JWT_SECRET);
//         if(authtoken){
//             success=true;
//         }
//         res.status(201).json({success, authtoken});
//     }
//     catch(err){
//         console.log(err);
//         res.status(400).json({Error:err.message})
//     }
// })


// Creating User into sqlite database
router.post('/createuser',async(req, res)=>{
    // console.log(req.body);
    try{
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        const age=req.body.age;
        const gender=req.body.gender;
        const weight=req.body.weight;
        const height=req.body.height;
        const image=req.body.image;

            db.get(`Select * from USERS where email=$email`,{$email:email}, async(error, row)=>{
                if(!error && row){
                    res.send("Email Id already Exists. Please Log in into registered account");
                }
                else{
                    db.run(`INSERT INTO USERS(name,email,password,age,gender,weight,height,image) VALUES(?,?,?,?,?,?,?,?)`,[name,email, password,age,gender,weight, height,image], (err)=>{
                        if(err){
                            console.log(err);
                            res.status(400).send("Some Error occurred");
                        }
                         res.redirect('/signin')
                    });
                }
                
            })      
    }  
    catch(err){
        res.status(500).json({Error:err.message})
        console.log(err);
    }
})

//Login using sqlite database
router.post('/signin', async(req, res)=>{
    try{    
            const email=req.body.email;
            const password=req.body.password;
            db.get(`Select * from USERS where email=$email and password=$password`,{$email: email,$password: password} , (error, row)=>{
                if(row){
                    const userdetails={
                        name:row.name,
                        email:row.email,
                        password:row.password,
                        age:row.age,
                        gender:row.gender,
                        weight:row.weight,
                        height:row.height,
                        image:row.image
                    }
                     res.redirect('/user_Dashboard_home');
                }
                else if(!row){
                    res.render('signup_signin', {error: 1})
                }
                else{
                    console.log(error);
                    res.redirect('/signin')
                }
        } )
       
    }
    catch(err){
        console.log(err);
        res.status(400).json({Error:err.message})
    }
})



module.exports=router
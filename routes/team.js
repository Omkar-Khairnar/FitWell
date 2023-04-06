const express=require('express');
const { findOne } = require('../models/TeamMember');
const Trainer=require('../models/TeamMember')
const router=express.Router()

//Route 1:Adding Trainer to FitWell : Admin Login required
router.post('/addtrainer', async(req, res)=>{
    let success=false;
    try{
        let prevTrainer=await findOne({email: req.body.email})
        if(prevTrainer){
            return res.status(400).json({success:success, message:"Email ID already registered."});
        }

        let trainer=await Trainer.create({
            image:req.body.image,
            name:req.body.name,
            email:req.body.email,
            department:req.body.department,
        })

        success=true;
        res.status(201).json({success, message:"Trainer Registered in FitWell"})
    }
    catch(err){
       res.status(500).json({Error: err.message})
       console.log(err);
    }
})

//Route 2: Removing Trainer from FitWell : Admin Login required.

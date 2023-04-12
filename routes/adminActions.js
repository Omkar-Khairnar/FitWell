const express=require('express')
const Trainer=require('../models/Trainer')
const Product=require('../models/product')
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
            name,
            email,
            salary,
            image,
            gender
        })
        alert("Trainer Added Successfully.")
    }
    catch(err){
        res.send(400).json({err})
    }
})

//Adding new Product to Database :Admin Login required
router.post('/addproduct', async(req,res)=>{
    try{
        
    }
    catch(err){
        res.send(400).json({err})
    }
})

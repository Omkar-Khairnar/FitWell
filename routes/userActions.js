const express=require('express')
const ContactUs=require('../models/contactform')
const ReviewSchema=require('../models/review')
const router=express.Router()
require('dotenv').config()
let alert=require('alert')

//submitting contact form :User login NOT required
router.post('/contactus', async(req,res)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const phone=req.body.phone;
        const subject=req.body.subject;
        const message=req.body.message;
        // const date=req.body.name;
        const data=await ContactUs.create({
            name:name,
            email:email,
            phone:phone,
            subject:subject,
            message:message,
        })
        // const id=data.id;
            alert('Form Submitted Successfully!!');
            return res.redirect('/contact');
        
    }
    catch(err){
        res.send(400).json({Error:err});
        console.log(err);
    }
})


//Submitting review. User Login required
router.post('/putreview', async(req, res)=>{
    try{
        const comment=req.body.comment;
        const userDetails = req.session.userDetails;
        if(!userDetails){
            alert('Please Login again. Session Expired.')
            return res.redirect('/signin');
        }
        let review=await ReviewSchema.create({
            user:userDetails.id,
            comment:comment,
            image:userDetails.image,
            name:userDetails.name,
        })

        const id=review.id;
        // console.log(id);
            alert('Review Submitted Successfully');
            return res.redirect('/user_Dashboard_reviews');
        

    }
    catch(err){
        res.status(400).json({Error:err});
    }
})

module.exports=router
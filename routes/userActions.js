const express=require('express')
const ContactUs=require('../models/contactform')
const ReviewSchema=require('../models/review')
const CartSchema=require('../models/Cart')
const OrderSchema=require('../models/Order')
const PaymentSchema=require('../models/payments')
const UserSchema=require('../models/User')
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

router.post('/addtocart',async(req,res)=>{
    try{
        if(!req.session.userDetails){
            return res.redirect('/signin');
        }
        const productid=req.body.productid;
        let product=await CartSchema.create({
            user:req.session.userDetails.id,
            productid:productid
        })

        const id=product.id;
        if(id){
            alert('Product added to cart Successfully.');
            res.redirect('/products');
        }

    } 
    catch(err){
        res.status(400).json({Error:err})
    }
})
router.post('/checkoutcart',async(req,res)=>{
    try{
        const userDetails=req.session.userDetails;
        const userid=userDetails.id;
        await CartSchema.deleteMany({user:userid})

        //Here this products should enter into order schema.
        const address=req.body.address;
        const finalamount=req.body.finalamount;
        const products=req.session.products;
        products.forEach(async(item) => {
            await OrderSchema.create({ 
                user:userid,
                name:item[0].name,
                image:item[0].img,
                amount:finalamount,
                description:item[0].description,
                address:address
            })
            // console.log("order with price added:" + item[0].price);
        });
        await PaymentSchema.create({
            user:userid,
            amount:finalamount,
        })
        return res.redirect('/user_Dashboard_cart');  
    }
    catch(err){
        console.log(err);
    }
})

router.post('/updateprofile', async(req, res)=>{
    try{
        const userDetails=req.session.userDetails;
        const id=userDetails.id;
        const name=req.body.name;
        const age=req.body.age;
        const weight=req.body.weight;
        const height=req.body.height;
        const image=req.body.image;

        await UserSchema.findByIdAndUpdate(id,{name:name, age:age, weight:weight,
        height:height,image:image});

        userDetails.name=name;
        userDetails.weight=weight;
        userDetails.height=height;
        userDetails.image=image;
        userDetails.age=age;

        return res.redirect('/user_Dashboard_profile')
        
    }
    catch(err){
        res.status(400).json({Error:err});
    }
})
 router.post('/deleteorder', async(req,res)=>{
    try{
        const orderid=req.body.orderid;
        await OrderSchema.findByIdAndDelete(orderid);
        return res.redirect('/user_Dashboard_myorders')

    }
    catch(err){
        console.log(err);
    }
 })

 router.post('/enroll',async(req,res)=>{
    try{
        const type=req.body.enrolltype;
        const userDetails=req.session.userDetails;
        if(!userDetails){
            return res.redirect('/signin');
        }
        else{
            const userid=userDetails.id; 
            const user=await UserSchema.find({_id:userid});
            if(type == 'enroll1'){
                const date=new Date(Date.now()+30*24*60*60*1000);
                const res=await UserSchema.findByIdAndUpdate(userid,{expirydate:date});
                req.session.userDetails.expirydate=date;
            }
            else if(type == 'enroll2'){
                const date=new Date(Date.now()+6*30*24*60*60*1000);
                const res=await UserSchema.findByIdAndUpdate(userid,{expirydate:date});
                req.session.userDetails.expirydate=date;

            }
            else{
                const date=new Date(Date.now()+12*30*24*60*60*1000);
                const res=await UserSchema.findByIdAndUpdate(userid,{expirydate:date});
                req.session.userDetails.expirydate=date;
            }
            return res.redirect('/user_Dashboard_home')
        }
    }
    catch(err){
        console.log(err);
    }
 })

module.exports=router
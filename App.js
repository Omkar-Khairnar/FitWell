const connectToMongo=require('./db')
const express=require('express')
var cors=require('cors')
const db1 = require("./data/sqlite_db_user");
const db2 = require("./data/sqlite_db_admin");
// connectToMongo();

let alert=require('alert')
const app=express();
app.use(express.urlencoded({extended: true}))

const PORT=5000;
app.set('view engine', 'ejs');
app.use(cors())
app.use(express.static('public'))
app.use(express.json());

app.get('/', (req,res)=>{
   res.render('home') 
})

app.get('/footer', (req,res)=>{
    res.render('footer')
})
app.get('/products', (req,res)=>{
    res.render('products')
})
app.get('/signin', (req,res)=>{
    res.render('signup_signin', {error: 0})
})
app.post('/signin',(req,res)=>{
    try{    
        const email=req.body.email;
        const password=req.body.password;
        db1.get(`Select * from USERS where email=$email and password=$password`,{$email: email,$password: password} , (error, row)=>{
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
app.post('/signup',async(req, res)=>{
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

            db1.get(`Select * from USERS where email=$email`,{$email:email}, async(error, row)=>{
                if(!error && row){
                    // res.send("Email Id already Exists. Please Log in into registered account");
                    alert('Email Id already Exists. Please Log in into registered account')
                }
                else{
                    db1.run(`INSERT INTO USERS(name,email,password,age,gender,weight,height,image) VALUES(?,?,?,?,?,?,?,?)`,[name,email, password,age,gender,weight, height,image], (err)=>{
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

app.get('/adminlogin', (req,res)=>{
    res.render('adminlogin',{error:0})
})
app.post('/adminlogin',(req,res)=>{
    try{    
        const email=req.body.email;
        const password=req.body.password;
        // console.log(email +" "+ password);
        db2.get(`Select * from ADMIN where email=$email and password=$password`,{$email: email,$password: password} , (error, row)=>{
            if(row){
                const userdetails={
                    name:row.name,
                    email:row.email,
                    password:row.password,
                }
                 res.redirect('/admin_dashboard_home');
            }
            else if(!row){
                res.render('adminlogin', {error: 1})
            }
            else{
                console.log(error);
                res.redirect('/adminlogin')
            }
    } )  
}
catch(err){
    console.log(err);
    res.status(400).json({Error:err.message})
}
})
app.get('/about', (req,res)=>{
    res.render('about')
})
app.get('/reviews', (req,res)=>{
    res.render('reviews')
})
app.get('/centres', (req,res)=>{
    res.render('centres')
})
app.get('/services', (req,res)=>{
    res.render('services')
})
app.get('/contact', (req,res)=>{
    res.render('contact')
})

app.get('/user_Dashboard_home', (req,res)=>{
    res.render('user_Dashboard_home')
})
app.get('/user_Dashboard_myorders', (req,res)=>{
    res.render('user_Dashboard_myorders')
})
app.get('/user_Dashboard_payment', (req,res)=>{
    res.render('user_Dashboard_payment')
})
app.get('/user_Dashboard_reviews', (req,res)=>{
    res.render('user_Dashboard_reviews')
})
app.get('/user_Dashboard_cart', (req,res)=>{
    res.render('user_Dashboard_cart')
})
app.get('/user_dashboard_workout', (req,res)=>{
    res.render('user_dashboard_workout')
})
app.get('/user_Dashboard_challenges', (req,res)=>{
    res.render('user_dashboard_challenges')
})
app.get('/user_Dashboard_profile', (req,res)=>{
    res.render('user_Dashboard_profile')
})
app.get('/user_dashboard_navbar', (req,res)=>{
    res.render('user_dashboard_navbar')
})
app.get('/user_dashboard_chat', (req,res)=>{
    res.render('user_dashboard_chat')
})
app.get('/admin_dashboard_side_wrapper', (req,res)=>{
    res.render('admin_dashboard_side_wrapper')
})
app.get('/admin_dashboard_top_wrapper', (req,res)=>{
    res.render('admin_dashboard_top_wrapper')
})
app.get('/admin_dashboard_home', (req,res)=>{
    res.render('admin_dashboard_home')
})
app.get('/admin_dashboard_customers', (req,res)=>{
    res.render('admin_dashboard_customers')
})
app.get('/admin_dashboard_trainers', (req,res)=>{
    res.render('admin_dashboard_trainers')
}) 
app.get('/admin_dashboard_payment', (req,res)=>{
    res.render('admin_dashboard_payment')
})
app.get('/admin_Dashboard_order', (req,res)=>{
    res.render('admin_Dashboard_order')
})


// app.use('/api/auth', require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })

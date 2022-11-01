const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors')
const pug=require('pug')
const bodyparser=require('body-parser')
const PORT=3000;

const db=require('./config/dbConfig')
// models
const User=require('./models/User')
const Employ=require('./models/Employ')
const Login=require('./models/Login')



app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.render('Add')
})


app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',(req,res)=>{
  let user=req.body.username
  let pass=req.body.pass

  Login.create({
    UserName:user,
    Password:pass
  })
    .then((data)=>{console.log(data.Password)})
    .catch((err)=>{console.log(err)})

 
  res.redirect('/dash')   
})

app.get('/employ',(req,res)=>{
  res.render('employ')
})
app.post('/employ',(req,res)=>{
     let Roleid=req.body.roleid;
     let Name=req.body.name;
     let workdept=req.body.workdept;
     let email=req.body.mail;
     let phoneno=req.body.phoneno;
     let city=req.body.city;

Employ.create({
      Role_id:Roleid,
      Name:Name,
      WorkDept:workdept,
      E_MailId:email,
      PhoneNo:phoneno,
      City:city
     })
     .then((data)=>{console.log(data)})
     .catch((err)=>{console.log(err)})
     res.redirect('/dash')
})

app.get('/data',(req,res)=>{ 
       Employ.findAll()
       .then((data)=>{
        res.send(data)
      })
       .catch((err)=>{console.log(err)})

 })

 app.get('/dash',(req,res)=>{
    res.render('table')
 })

app.post('/',(req,res)=>{
  let name=req.body.user
  let city=req.body.city
  let age=req.body.age
  User.create({
    Name:name,
    City:city,
    Age:age
  })
    .then((data)=>{console.log(data)})
    .catch((err)=>{console.log(err)})

 
  res.redirect('/')

})


db.authenticate()
   .then(()=>{console.log("Connected to DataBase")})
   .catch((err)=>{console.log(err)})



app.listen(PORT,()=>{
    console.log('Server Running')
})
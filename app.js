const express=require('express');
const app=express();
const path=require('path');
const bcrypt=require('bcrypt')
const cors=require('cors');
const pug=require('pug');
const bodyparser=require('body-parser');
const PORT=3000;

const db=require('./config/dbConfig')
// models
const User=require('./models/User');
const Login=require('./models/Login');
const Employ=require('./models/Employ');
const Payroll=require('./models/payroll');

const { Console, error } = require('console');



app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.render('Add')
})



// Login 
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',async(req,res)=>{
  const{username,password}=req.body
  let person= await Login.findOne({ where : { UserName: username } })
  pass= await bcrypt.compare(password,person.Password)
    if(pass){
      res.redirect('/Dashboard')
      }else{
      res.send({msg:'USerName or Password Error'}) 
      }
console.log(pass)

}) 
//login Create
app.post('/createacc',(req,res)=>{
  let user=req.body.username
  //let pass=req.body.pass
  let pass=bcrypt.hashSync(req.body.pass, 10);

  Login.create({
    UserName:user,
    Password:pass
  })
    .then((data)=>{console.log(Login.Password)})
    .catch((err)=>{console.log(err)})

 console.log(user)
  res.redirect('/login')   
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




///testing
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

app.get('/Dashboard',(req,res)=>{
  res.render('dash') 
})
app.post('/new',(req,res)=>{
  let Name=req.body.name;
  let dept=req.body.dept;
  let email=req.body.mail;
  let phoneno=req.body.phoneno;
  let locate=req.body.locate;

Employ.create({
  Name:Name,
  Department:dept,
  E_MailId:email,
  PhoneNo:phoneno,
  Location:locate 
  })
  .then((data)=>{console.log(data)})
  .catch((err)=>{console.log(err)})
  res.redirect('/new')
}) 




app.get('/payroll',(req,res)=>{
  res.render('payroll')
})
app.post('/payroll',(req,res)=>{
  let dept=req.body.department;
  let roll=req.body.role;
  let doj=req.body.date;
  let amount=req.body.am
  Payroll.create({
    Department:dept,
    Role:roll,
    DateofJoin:doj,
    Amount:amount
  })
  .then((data)=>{console.log(data)})
  .catch((err)=>{console.log(err)})
  res.redirect('/payroll')
})
app.get('/payrolldata',(req,res)=>{
  Payroll.findAll()
  .then((data)=>{
    res.send(data)
  })
   .catch((err)=>{console.log(err)})
})
db.authenticate()
   .then(()=>{console.log("Connected to DataBase")})
   .catch((err)=>{console.log(err)})



app.listen(PORT,()=>{
    console.log('Server Running')
})
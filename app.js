const express=require('express');
const app=express();
const { Sequelize } = require('sequelize');
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

  if(person.UserName){
    if(pass){
      res.redirect('/Dashboard')
      }else{
      res.send({msg:'USerName or Password Error'}) 
      }
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
  let data={
    Name:req.body.user,
    City:req.body.city,
    Age:req.body.age
  }
  User.create(data)
    .then((data)=>{console.log(data)})
    .catch((err)=>{console.log(err)})
  res.redirect('/')

})

app.get('/Dashboard',(req,res)=>{
  res.render('dash') 
})
app.post('/Dashboard',(req,res)=>{
  let data={
    Name:req.body.name,
    Department:req.body.dept,
    E_MailId:req.body.mail,
    PhoneNo:req.body.phoneno,
    Location:req.body.locate
  }
Employ.create(data)
  .then((data)=>{console.log(data)})
  .catch((err)=>{console.log(err)})
  res.redirect('/Dashboard')
}) 



//    payroll
app.get('/payroll',(req,res)=>{
  res.render('payroll')
})
app.post('/payroll',(req,res)=>{
  let data={
    Department:req.body.department,
    Role:req.body.role,
    DateofJoin:req.body.date,
    Amount:req.body.am
  }
  Payroll.create(data)
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




app.post('/hasmany',(req,res)=>{
  let employ,payroll;
  let ids=req.body.ids
 return Employ.findOne({where:{id:ids}})
 .then((data)=>{
      employ=data;
      return Payroll.findAll()
 })
 .then((data)=>{
    payroll=data;
    return employ.setPayroll(payroll)
 })
.catch((err)=>{console.log(err)})
})

Employ.hasMany(Payroll)
db.sync({alter:true})

app.listen(PORT,()=>{
    console.log('Server Running')
})
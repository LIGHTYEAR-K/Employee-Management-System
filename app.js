const express=require('express');
const app=express();
const { Sequelize } = require('sequelize');
const path=require('path');
const bcrypt=require('bcrypt')
const pug=require('pug');
const bodyparser=require('body-parser'); 
const PORT=3000;

const dataBase=require('./config/dbConfig')
// models
const Login=require('./models/Login');
const Employe=require('./models/Employe');
const Payrole=require('./models/Payrole');
const Userrole=require('./models/Userrole')
const User=require('./models/Users')




app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({extended:true}));





// Login 
app.get('/login',(req,res)=>{
  res.render('login')
})
app.post('/login',async(req,res)=>{
const{username,password}=req.body
let person= await Login.findOne({ where : { UserName: username } })
pass= await bcrypt.compare(password,person.Password)
emp= await bcrypt.compare(password,person.Password)

      if(person.UserName=='admin'){
        if(pass){
          console.log(pass)
          res.redirect('/Dashboard')
          }else{
          res.send({msg:'USerName or Password Error'}) 
          }
      }
      else if(person.UserName==='user'){
        if(emp){
          console.log(pass)
          res.redirect('/user')
          }else{
          res.send({msg:'USerName or Password Error'}) 
          }
      }
      else{
        console.log('Something Wrong!!')
      }

})
   //login Create
app.post('/createAccount',(req,res)=>{
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
       Employe.findAll()
       .then((data)=>{
        res.send(data)
})
       .catch((err)=>{console.log(err)})
})

app.get('/user',(req,res)=>{
    res.render('user')
})
app.get('/userrole',(req,res)=>{
  res.render('userrole')
})


//      Admin DashBoard
app.get('/Dashboard',(req,res)=>{
  res.render('main')
})
app.post('/Dashboard',(req,res)=>{
  let data={
    Name:req.body.name,
    Department:req.body.dept,
    E_MailId:req.body.mail,
    PhoneNo:req.body.phoneno,
    Location:req.body.locate
  }
Employe.create(data)
  .then((data)=>{console.log(data)})
  .catch((err)=>{console.log(err)})
  res.redirect('/Dashboard')
}) 

//    Payrole
app.get('/Payrole',(req,res)=>{
  res.render('payrole')
})

app.post('/Payrole',(req,res)=>{
  let data={
    Department:req.body.department,
    Role:req.body.role,
    DateofJoin:req.body.date,
    Amount:req.body.am
  }
  Payrole.create(data)
  .then((data)=>{console.log(data)})
  .catch((err)=>{console.log(err)})
  res.redirect('/Payrole')
})

app.get('/Payroledata',(req,res)=>{
  Payrole.findAll()
  .then((data)=>{
    res.send(data)
  })
   .catch((err)=>{console.log(err)})
})

//Corrections

app.get('/moto',(req,res)=>{
  res.render('role')
})
app.get('/motodata',(req,res)=>{
  Userrole.findAll()
  .then((data)=>{res.send(data)})
  .catch((err)=>{console.log(err)})
})
app.post('/moto',(req,res)=>{
  let {Role}=req.body 
  Userrole.create({
    Role:Role
  })
  res.redirect('/moto')
})



app.get('/rola',(req,res)=>{
  res.render('userlist')
})
app.get('/roladata',(req,res)=>{
  User.findAll()
  .then((data)=>{res.send(data)})
  .catch((err)=>{console.log(err)})
})
app.post('/rola',(req,res)=>{
  let data={
    FirstName:req.body.fname,
    LastName:req.body.lname,
    Role:req.body.role,
    E_MailId:req.body.mail,
    PhoneNo:req.body.phoneno,
    Location:req.body.city
  }
  User.create(data)
  res.redirect('/rola')
  
})
// Employe.hasMany(Payrole)
// Payrole.belongsTo(Employe)

Userrole.hasMany(User)
User.belongsTo(Userrole)
dataBase.sync({alter:true})

app.get('/hasmany',(req,res)=>{
  let user=Userrole.findAll({ 
     include:[{
      model:User
     }],
    where: { id:1 }
})
.then((data)=>{res.status(200).send(data)})
.catch((err)=>{console.log(err)})
})


app.get('/modify',(req,res)=>{
   let roles,users;
   return Userrole.findOne({where:{Role:'Manager'}})
   .then((data)=>{
     roles=data;
     return User.findAll({where:{Role:'Manager'}})
  .then((data)=>{
    users=data;
    return roles.addUser(users)
  .then((data)=>{
    console.log(data)
    res.send(`<h1 style='text-align:center;'>Foreign Assigned</h1>`)
  })
  .catch((err)=>{console.log(err)})
  })
   })
})


dataBase.authenticate()
   .then(()=>{console.log("Connected to DataBase")})
   .catch((err)=>{console.log(err)})


app.listen(PORT,()=>{
    console.log('Server Running')
})
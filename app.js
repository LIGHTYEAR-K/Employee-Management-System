const express=require('express');
const app=express();
const { Sequelize } = require('sequelize');
const path=require('path');
const bcrypt=require('bcrypt');
const pug=require('pug');
const cors=require('cors');
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
  res.render('newl')
})
app.get('/register',(req,res)=>{
  res.render('register')
})
app.post('/login',async(req,res)=>{
  const{username,password}=req.body
  try{
    let person= await Login.findOne({ where : { UserName: username } })
    if (person){
      pass= await bcrypt.compare(password,person.Password)
      if(pass){
        return res.redirect('/userlist')
      }
      else{
         return res.render('newl',{info:'UserName or Password Wrong'})
      }
    }
    else{
      res.render('newl',{info:'Sorry,we could not authenticate you.Try again Later'})
  }
  } 
  catch(error){
    console.log(error)
    res.status(404).send("Error")
  }
})
  //login Create
app.post('/register',(req,res)=>{

  let
      user=req.body.name
      email=req.body.email
      phone=req.body.phone
      opass=req.body.pass
      pass=bcrypt.hashSync(req.body.pass, 10)
      repass=req.body.re_pass
 if(opass===pass){
  Login.create({
    UserName:user,
    EmailId:email,
    PhoneNo:phone,
    Password:pass
  })
.then((data)=>{res.render('register',{hi:hide})})
.catch((err)=>{console.log(err)})
res.redirect('/login')
  
 }
 else{
  res.render('register',{err:'NOT Verifyed plz Match the Password'})
 }
     
})




app.get('/data',(req,res)=>{ 
       Employe.findAll()
       .then((data)=>{
        res.send(data)
})
       .catch((err)=>{console.log(err)})
})



//     Employee Admin DashBoard
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

app.get('/userrole',(req,res)=>{
  res.render('role')
})
app.get('/userroledata',(req,res)=>{
  Userrole.findAll()
  .then((data)=>{res.send(data)})
  .catch((err)=>{console.log(err)})
})
app.post('/userrole',(req,res)=>{
  let {Role}=req.body 
  Userrole.create({
    Role:Role
  })
  res.redirect('/userrole')
})

 
app.get('/userlist',async(req,res)=>{
  let lists,files;
try{
  lists= await Userrole.findAll({ attributes:['Role']});
  res.render('userlist',{passed:lists})
}
catch{
   console.log(error)
}
})
app.get('/userlistdata',(req,res)=>{
  User.findAll()
  .then((data)=>{res.send(data)})
  .catch((err)=>{console.log(err)})
})
app.post('/userlist',async(req,res)=>{
  let roles,users;
  try{
  let FirstName=req.body.fname,
      LastName=req.body.lname,
      Role=req.body.role,
      E_MailId=req.body.mail,
      PhoneNo=req.body.phoneno,
      Location=req.body.city
  
  await User.create({
    FirstName:FirstName,
    LastName:LastName,
    Role:Role,
    E_MailId:E_MailId,
    PhoneNo:PhoneNo,
    Location:Location
  })

  let one= await Userrole.findOne({where:{Role:Role}})
  roles=one;
  let two= await User.findAll({where:{Role:Role}})
  users=two;
  let three=  await roles.addUser(users)
  console.log(three)
res.send("Added!").status(200)
}catch(error){
  console.log(error)
}
})
// Employe.hasMany(Payrole)
// Payrole.belongsTo(Employe)

Userrole.hasMany(User)
User.belongsTo(Userrole)
dataBase.sync({alter:true})



app.post('/edits',(req,res)=>{
   let ids=req.body.id
   User.findOne({where:{ id:ids} })
   .then((data)=>{
     res.send(data)
   })
})
app.put('/updates/:id',(req,res)=>{

  req.params.id
  let ids=req.body.ids
      FirstName=req.body.fname,
      LastName=req.body.lname,
      Role=req.body.role,
      E_MailId=req.body.mail,
      PhoneNo=req.body.phoneno,
      Location=req.body.city
  User.update({FirstName:FirstName,LastName:LastName,Role:Role,E_MailId:E_MailId,PhoneNo:PhoneNo,Location:Location},{where:{id:ids}})

})

app.delete('/deleteData',(req,res)=>{
    let value=req.body.id
    User.destroy({where:{id: value }})
    .then((data)=>{
        console.log(data)
    })
    res.send('deleted').Status( 200 )
    .catch((err)=>{console.log(err)})
})



dataBase.authenticate()
   .then(()=>{console.log("Connected to DataBase")})
   .catch((err)=>{console.log(err)})


app.listen(PORT,()=>{
    console.log('Server Running')
})
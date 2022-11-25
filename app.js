const express=require('express');
const app=express();
const { Sequelize } = require('sequelize');
const path=require('path');
const bcrypt=require('bcrypt');
const pug=require('pug');
const bodyparser=require('body-parser'); 
const PORT=4000;

const dataBase=require('./config/dbConfig')
// models
const Employe=require('./models/Employe');
const Payrole=require('./models/Payrole');
const Userrole=require('./models/Userrole')
const User=require('./models/Users')

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({extended:true}));

 
app.get('/login',(req,res)=>{
  res.render('login')
})

app.get('/Welcome',async(req,res)=>{
  res.render('Landingpage')
})


//Login
app.post('/login',async(req,res)=>{
  const{username,password}=req.body
  try{
    let person= await User.findOne({
      include:Userrole,
      where:{UserName: username}
  })
    if (person){
      pass= await bcrypt.compare(password,person.Password)
      console.log(person)
      let person1=JSON.stringify(person)
      console.log(pass)
      if(pass){
        return res.send({success:true,msg:'Successfully Logined',Person: person})
        // return res.redirect('/userlist')
      }
      else{
        return res.send({success:false,err:'Username or Password Wrong'})
        //  return res.render('newl',{info:'UserName or Password Wrong'})
      }
    }
    else{
      return res.send({success:false,err:'Oops,Something went Wrong.Try Again Later!'})
      // res.render('newl',{info:'Oops,Something went Wrong.Try Again Later!'})
  }
  } 
  catch(error){
    console.log(error)
    res.send({success:false,err:error})
  }
})

//Employee Admin DashBoard
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

//Userroles
app.get('/userrole',(req,res)=>{
  res.render('role')
})
app.get('/userroledata',(req,res)=>{
  Userrole.findAll()
  .then((data)=>{res.send(data)})
  .catch((err)=>{console.log(err)})
})

app.post('/userrole',async(req,res)=>{
  let {Role}=req.body
  try{
    let roles= await Userrole.findOne({ where : { Role: Role } })
    if (roles){
      res.send({success:true,error: 'Already Exist'}).status(200)
    }
    else{
      await Userrole.create({
        Role:Role
      })
    res.send({success:true}).status( 200 )
  }
  } 
  catch(error){
    console.log(error)
    res.status(404).send("Error")
  }
 
})

 
app.get('/userlist',async(req,res)=>{
  let lists;
try{
  lists= await Userrole.findAll({ attributes:['Role']});
  res.render('userlist',{passed:lists})
}
catch(error){
   console.log(error)
}
})

app.get('/userlistdata',async(req,res)=>{
  try{
  let data=await User.findAll()
  res.send(data).status(200)
  }
  catch(err){
    console.log(err)
  }
})
app.post('/userlist',async(req,res)=>{
  let roles,users;

  try{
  let FirstName=req.body.fname,
      LastName=req.body.lname,
      Role=req.body.role,
      username=req.body.username,
      pass=req.body.passw,
      passw=bcrypt.hashSync(req.body.passw, 10)
      E_MailId=req.body.mail,
      PhoneNo=req.body.phoneno,
      Location=req.body.city
    let usernamedata= await User.findOne({where: {UserName: username}})
    if(!FirstName || !username || !passw || !PhoneNo || !Role){
      res.send({success: false, error: 'Required Fields are Empty'})
     }
    else if(usernamedata){
      res.send({success: false, error: 'UserName is Already Exist'})
    }
    else{
        await User.create({
          FirstName:FirstName,
          LastName:LastName,
          UserName:username,
          Password:passw,
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
  res.send({success:true}).status(200)
}
}catch(error){
  console.log(error)
  res.send({success:false, error: 'Oops,Error'})
}
})

app.post('/edits',(req,res)=>{
   let ids=req.body.id
   User.findOne({where:{ id:ids} })
   .then((data)=>{
     res.send(data).status(200)
   })
})

app.post('/values',(req,res)=>{
  let id=req.body.id
  Userrole.findOne({where:{ id:id} })
  .then((data)=>{
    res.send({success:true,data:data}).status(200)
  })
})

app.put('/updates/:id',async(req,res)=>{
  let ids=req.body.ids
      FirstName=req.body.fname,
      LastName=req.body.lname,
      Role=req.body.role,
      username=req.body.username,
      // pass=bcrypt.hashSync(req.body.pass, 10)
      E_MailId=req.body.mail,
      PhoneNo=req.body.phoneno,
      Location=req.body.city
    await User.update({FirstName:FirstName,LastName:LastName,UserName:username,Role:Role,E_MailId:E_MailId,PhoneNo:PhoneNo,Location:Location},{where:{id:ids}})
    let one= await Userrole.findOne({where:{Role:Role}})
    roles=one;
    let two= await User.findAll({where:{Role:Role}})
    users=two;
    let three=  await roles.addUser(users)
    console.log(three)
  res.send({success: true, User: User}).status(200)
})

app.delete('/deleteData',async(req,res)=>{
    try{
    let value=req.body.id
    await User.destroy({where:{id: value }})
    res.send({success:true}).status( 200 )
    }
   catch(err){
    console.log(err)
   }
})

app.post('/menu',async(req,res)=>{
  id=req.body.id
  menu=req.body.menu
  console.log(menu)
  console.log(id)
  try{
    let roles= await Userrole.update({Menu:menu},{where:{id:id}})
    res.send({success:true,roles:roles}).status(200)
  }
  catch(err){
   console.log(err)
   res.send({success:false, error: err})
  }
})

Userrole.hasMany(User)
User.belongsTo(Userrole)
//dataBase.sync({alter:true})

dataBase.authenticate()
   .then(()=>{console.log("Connected to DataBase")})
   .catch((err)=>{console.log(err)})


app.listen(PORT,()=>{
    console.log('Server Running')
})
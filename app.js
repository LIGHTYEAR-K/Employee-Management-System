const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors')
const pug=require('pug')
const bodyparser=require('body-parser')
const PORT=3000;
// models
const User=require('./models/User')
const db=require('./config/dbConfig')


app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.render('Add')
})
// app.get('/create',(req,res)=>{
//     User.bulkCreate()
//     .then((data)=>{res.send(data)})
//     .catch((err)=>{console.log(err)})
// })
app.get('/data',(req,res)=>{ 
       User.findAll()
       .then((data)=>{
        res.send(data)
      })
       .catch((err)=>{console.log(err)})
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

app.post('update',(req,res)=>{
  User.update({City:'Salem'},{where:{Name:'Admin'}}) 
  .then((data)=>{res.send(data)})
  .catch((err)=>{console.log(err)})
})
})


db.authenticate()
   .then(()=>{console.log("Connected to DataBase")})
   .catch((err)=>{console.log(err)})



app.listen(PORT,()=>{
    console.log('Server Running')
})
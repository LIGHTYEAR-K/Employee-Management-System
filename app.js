const express=require('express');
const app=express();
const path=require('path');
const pug=require('pug')
const bodyparser=require('body-parser')
// models
const User=require('./models/User')
const db=require('./config/dbConfig')


const PORT=3000


app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('login')
})
// app.get('/create',(req,res)=>{
//     User.bulkCreate()
//     .then((data)=>{res.send(data)})
//     .catch((err)=>{console.log(err)})
// })
app.get('/data',(req,res)=>{ 
       User.findAll({ attributes:['Name','City']})
       .then((data)=>{res.send(data)})
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

})
db.authenticate()
   .then(()=>{console.log("Connected to DataBase !")})
   .catch((err)=>{console.log(err)})



app.listen(PORT,()=>{
    console.log('Server Running')
})
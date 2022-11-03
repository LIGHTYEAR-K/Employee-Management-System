const db = require('../config/dbConfig')
const bcrypt=require('bcrypt')
const Sequelize = require('sequelize');

const Login = db.define('login',{
    UserName:{
        type:Sequelize.DataTypes.STRING,
        // get() {
        //     const rawValue = this.getDataValue('UserName');
        //     return rawValue.toUpperCase();
        //   }
    },
    Password:{
        type:Sequelize.DataTypes.STRING,
        //  set(value){
        //     const salt= bcrypt.genSaltSync(12);
        //     const hash= bcrypt.hashSync(value,salt)
        //     this.setDataValue('Password', hash);
        // }
    }
} ,  
   {
     freezeTableName:true,
     timestamps:false
})

//Login.sync({force:true})


module.exports = Login
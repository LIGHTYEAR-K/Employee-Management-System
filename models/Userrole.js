const dataBase = require('../config/dbConfig')
const Sequelize = require('sequelize');
const User= require('./Users')

const Userrole= dataBase.define('UserRole',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Role:{
        type:Sequelize.DataTypes.STRING,
    }
},  
    {
     freezeTableName:true,
     timestamps:true
})
 
Userrole.associate=models=>{
    Userrole.hasMany(models.User);
}




module.exports = Userrole
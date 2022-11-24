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
    },
    Menu: {
        type: Sequelize.JSONB,
        defaultValue: {}
    }
},  
    {
     freezeTableName:true,
     timestamps:false
})
 
Userrole.associate=models=>{
    Userrole.hasMany(models.User);
}




module.exports = Userrole
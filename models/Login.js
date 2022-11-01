const db = require('../config/dbConfig')
const Sequelize = require('sequelize');

const Login = db.define('login',{
    UserName:{
        type:Sequelize.DataTypes.STRING,
        get() {
            const rawValue = this.getDataValue('Name');
            return rawValue.toUpperCase();
          }
    },
    Password:{
        type:Sequelize.DataTypes.STRING
    }
} ,  
   {
     freezeTableName:true,
     timestamps:false
})

//Login.sync()


module.exports = Login
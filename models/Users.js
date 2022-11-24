const dataBase = require('../config/dbConfig')
const Sequelize = require('sequelize');
const Userrole = require('./Userrole');

const User = dataBase.define('User',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FirstName:{
        type:Sequelize.DataTypes.STRING
    },
    UserName:{
        type:Sequelize.DataTypes.STRING
    },
    Password:{
        type:Sequelize.DataTypes.STRING
    },
    LastName:{
        type:Sequelize.DataTypes.STRING
    },
    Role:{
        type:Sequelize.DataTypes.STRING
    },
    E_MailId:{
        type:Sequelize.DataTypes.STRING
    },
    PhoneNo:{
        type:Sequelize.DataTypes.STRING
    },
    Location:{
        type:Sequelize.DataTypes.STRING
    },

} ,  
   {
     freezeTableName:true,
     timestamps:false
})


User.associate=models=>{
	User.belongsTo(models.Userrole)
}
module.exports = User
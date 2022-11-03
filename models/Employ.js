const db = require('../config/dbConfig')
const Sequelize = require('sequelize');
const Payroll=require('./payroll');

const Employ = db.define('employ',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type:Sequelize.DataTypes.STRING,
        get() {
            const rawValue = this.getDataValue('Name');
            return rawValue.toUpperCase();
          }
    },
    Department:{
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


Employ.hasMany(Payroll)
Employ.sync({force:true})


module.exports = Employ
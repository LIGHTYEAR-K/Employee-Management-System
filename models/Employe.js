const dataBase = require('../config/dbConfig')
const Sequelize = require('sequelize');
const Payroll = require('./Payrole');

const Employe = dataBase.define('Employee',{
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

// Employe.associate=models=>{
//     Employe.hasMany(models.PayRole);
// }

//Employe.sync({alter:true})


module.exports = Employe
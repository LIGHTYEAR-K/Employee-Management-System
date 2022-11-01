const db = require('../config/dbConfig')
const Sequelize = require('sequelize');

const Employ = db.define('employ',{

    Role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Name:{
        type:Sequelize.DataTypes.STRING,
        get() {
            const rawValue = this.getDataValue('Name');
            return rawValue.toUpperCase();
          }
    },
    WorkDept:{
        type:Sequelize.DataTypes.STRING
    },
   E_MailId:{
        type:Sequelize.DataTypes.STRING
    },
    PhoneNo:{
        type:Sequelize.DataTypes.INTEGER
    },
    City:{
        type:Sequelize.DataTypes.STRING
    },

} ,  
   {
     freezeTableName:true,
     timestamps:false
})

//Employ.sync({force:true})


module.exports = Employ
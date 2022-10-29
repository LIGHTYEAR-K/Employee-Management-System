const db = require('../config/dbConfig')
const Sequelize = require('sequelize');

const User = db.define('user',{
    Name:{
        type:Sequelize.DataTypes.STRING,
    },
    City:{
        type:Sequelize.DataTypes.STRING
    },
    Age:{
        type:Sequelize.DataTypes.INTEGER,
    }
} ,  
   {
     freezeTableName:true,
     timestamps:false
})

///User.sync({force:true})



module.exports = User
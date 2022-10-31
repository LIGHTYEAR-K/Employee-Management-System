const db = require('../config/dbConfig')
const Sequelize = require('sequelize');

const User = db.define('user',{
    Name:{
        type:Sequelize.DataTypes.STRING,
        get() {
            const rawValue = this.getDataValue('Name');
            return rawValue.toUpperCase();
          }
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

// User.sync({aler:true}).then(()=>{
//     User.destroy({where:{id:'6'}})
// .then((data)=>{console.log(data)})
// .catch((err)=>{console.log(err)})
// })


module.exports = User
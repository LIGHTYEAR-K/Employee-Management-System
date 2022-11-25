const dataBase = require('../config/dbConfig')
const Sequelize = require('sequelize');
const Employe=require('./Employe');

const Payrole = dataBase.define('PayRole',{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
        Department: {
			type: Sequelize.STRING
		},
		Role: {
			type: Sequelize.STRING
		},
		DateofJoin: {
			type: Sequelize.STRING
		},
        Amount: {
			type: Sequelize.INTEGER
		},

	},{
        freezeTableName:true,
        timestamps:false
   })

// Payrole.associate=models=>{
// 	Payrole.belongsTo(models.Employe)
// }

//Payrole.sync({alter:true})
module.exports = Payrole

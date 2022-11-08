const db = require('../config/dbConfig')
const Sequelize = require('sequelize');
const Employ=require('./Employ');

const Payroll = db.define('payroll',{
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

Payroll.associate=models=>{
	Payroll.belongsTo(models.Employ)
}

//Payroll.sync({alter:true})
module.exports = Payroll

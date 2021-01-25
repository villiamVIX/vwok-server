const { Sequelize, sequelize, DataTypes } = require('../init.js')
const db_Name = 'vw_users'

const vw_users = sequelize.define(db_Name, {
	uid: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV1,
		unique: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
})

vw_users.sync({
	//  alter: true 
}).then(() => {
	// 建表
	console.log(`${db_Name}表模型同步`)
})

module.exports = vw_users

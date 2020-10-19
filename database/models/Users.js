const {
	Sequelize,
	sequelize
} = require('../init.js')

const DataTypes = require('sequelize/lib/data-types');


const Users = sequelize.define('user', {
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

Users.sync({ alter: true }).then(() => {
	// 建表
	console.log('Users表模型同步')
})

module.exports = Users

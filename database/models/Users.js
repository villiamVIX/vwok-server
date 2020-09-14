const {
	Sequelize,
	sequelize
} = require('../init.js')

const Users = sequelize.define('user',{
	username : {
		type:Sequelize.STRING,
		validate:{
			notEmpty:true
		}
	},
	password : {
		type:Sequelize.STRING,
		validate:{
			notEmpty:true
		}
	}
})

Users.sync().then(()=>{
	// 建表
	console.log('表模型同步')
})

module.exports = Users
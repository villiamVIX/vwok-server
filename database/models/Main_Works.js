const {
	Sequelize,
	sequelize
} = require('../init.js')

const DataTypes = require('sequelize/lib/data-types');


const Main_Works = sequelize.define('Main_Works', {
	vwok_id: {
		type: DataTypes.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV1,
		unique: true,
		comment: '主任务id主键'
	},
	creater_name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		},
		comment: '创建人名称'
	},
	uid: {
		type: DataTypes.UUID,
		allowNull: true,
		validate: {
			notEmpty: true
		},
		comment: '创建人id'
	},
	wok_name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		},
		comment: '任务名'
	},
	start_time: {
		type: Sequelize.DATEONLY,
		validate: {
			notEmpty: true
		},
		comment: '开始时间'
	},
	estimate_time: {
		type: Sequelize.DATEONLY,
		validate: {
			notEmpty: true
		},
		comment: '预计完成时间'
	},
	teammate: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		},
		comment: '参与团队人员'
	},
	total_progress: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		},
		comment: '总进度'
	},
	
})

Main_Works.sync({
	alter: true
}).then(() => {
	// 建表
	console.log('Main_Works表模型同步')
})

module.exports = Main_Works

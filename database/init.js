const Sequelize = require('sequelize');
const sequelize = new Sequelize('vwok', 'root', 'zw11663', {
	host: '120.79.171.194',
	dialect: 'mysql',
	port: '3306',
	// 改时区
	timezone: '+08:00',
	dialectOptions: {
		dateStrings: true,
		typeCast: true
	},
	define: {
		// 兼容存入中文
	    charset: 'utf8',
	    collate: 'utf8_general_ci', 
	    timestamps: true
	  },
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

module.exports = {
	Sequelize,
	sequelize
}

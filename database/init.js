const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', 'zw11663', {
	host: '120.79.171.194',
	dialect: 'mysql',
	port: '3306'
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
const nodemailer = require('nodemailer');


let user = 'vwok-account@qq.com',
	pass = 'tnogfbgzjtmaddcd' // vwok

const Email_Tool = {
	config: {
		host: "smtp.qq.com",
		port: 465,
		auth: {
			user, // 发件人
			pass // 密码
		}
	},
	get transporter() { //get方法,直接得到config对象  transporter：在controlers的user.js里要用这个方法
		return nodemailer.createTransport(this.config);
	},
	get verify() { //verify自定义的方法：生成验证码
		return Math.random().toString().substring(2, 6); //substring(2,6)：验证码要4位，从2到6位提取
	},
	get time() {
		return Date.now();
	}
};
module.exports = {
	Email_Tool,
	user
};

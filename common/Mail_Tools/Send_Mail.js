const nodemailer = require('nodemailer');


let Email_Master_User = 'vwok-account@qq.com',
	pass = 'tnogfbgzjtmaddcd' // vwok

const Email_Tool = {
	config: {
		host: "smtp.qq.com",
		port: 465,
		auth: {
			user: Email_Master_User, // 发件人
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

// 邮件发射工具
const Send_Email_Tool = async (res,mailOptions) => {
	Email_Tool.transporter.sendMail(mailOptions).then(data => {
		console.log(data)
		return res.send({
			msg: '验证码发射成功',
			code: 200
		})
	}).catch(err => {
		return res.send({
			code: 421,
			msg: '发射失败，请检查邮箱',
		})
	})
}

module.exports = {
	Email_Tool,
	Email_Master_User,
	Send_Email_Tool
};

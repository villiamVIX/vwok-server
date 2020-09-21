const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TOKEN_SECRET = 'villiam_wok_2020_09_15'
const Users = require('../database/models/Users.js')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const router = express.Router();
// 邮箱模板
const template = ejs.compile(fs.readFileSync(path.join(__dirname, '../common/mail/email.ejs'), 'utf8'));



const send_Email_Tool = async (mailOptions) => {
	let {
		Email_Tool
	} = require('../common/mail/sendMail.js');

	return Email_Tool.transporter.sendMail(mailOptions)
}


// 重置密码
router.post('/email/forgot', async (req, res) => {
	let {
		Email_Tool,
		user
	} = require('../common/mail/sendMail.js');

	let {
		email
	} = req.body; //前端发送来的验证邮箱

	const user_Info = await Users.findOne({
		where: {
			email
		}
	})
	if (!user_Info) {
		return res.send({
			code: 450,
			msg: "该邮箱未注册"
		})
	}

	// 数据持久化 便于验证
	req.sessionStore.verify = Email_Tool.verify;
	req.sessionStore.email = email;


	const send_Email = async (request, response, next) => {


		const html = template({
			title: 'VWOK 密码重置',
			verify: req.sessionStore.verify,
			email
		});

		const mailOptions = { //发送给用户显示的字段
			from: `VWOK ${user}`,
			to: email,
			subject: '注册VWOK邮箱验证', // 邮件标题
			html // ejs邮件模板
		}
		send_Email_Tool(mailOptions)
	};
})



router.post('/email', (req, res) => {
	let {
		Email_Tool,
		user
	} = require('../common/mail/sendMail.js');

	let {
		email
	} = req.body; //前端发送来的验证邮箱

	const cheak_Email_Existed = async (request, response, next) => {
		const model = await Users.findOne({
				where: {
					email
				}
			}).then(data => {
				if (data !== null)
					return res.send({
						msg: '邮箱已存在',
						code: 450
					})
				//发邮件
				send_Email()
			})
			.catch(err => {
				res.send({
					msg: '验证邮件是否存在失败',
					code: 423
				})
			})
	}
	cheak_Email_Existed()



	// 数据持久化 便于验证
	req.sessionStore.verify = Email_Tool.verify;
	req.sessionStore.email = email;

	console.log(req.sessionStore.verify)

	const send_Email = async (request, response, next) => {

		const html = template({
			title: 'VWOK 验证码',
			verify: req.sessionStore.verify,
			email
		});

		const mailOptions = { //发送给用户显示的字段
			from: `VWOK ${user}`,
			to: email,
			subject: '注册VWOK邮箱验证', // 邮件标题
			html // ejs邮件模板
		}

		send_Email_Tool(mailOptions).then(data => {
			console.log(data)
			res.send({
				msg: '验证码发射成功',
				code: 200
			})
		}).catch(err => {
			res.send({
				code: 421,
				msg: '发射失败，请检查邮箱',
			})
		})
	};
})


// 注册
router.post('/register', async (req, res) => {
	let {
		username,
		password,
		verify,
		email
	} = req.body
	console.log(req.body)

	console.log(`存储的session验证码 ${req.sessionStore.verify} ---------- ${verify}`)


	if (email !== req.sessionStore.email || verify !== req.sessionStore.verify) {
		res.send({
			msg: "验证码校验错误",
			code: 422
		});
		return false
	}

	let bcrypt_Password = bcrypt.hashSync(password, 5)

	const model = await Users.findOne({
		where: {
			email
		}
	})
	if (model) {
		return res.send({
			code: 450,
			msg: "邮箱已被占用"
		})
	}
	const user = await Users.create({
		username,
		email,
		password: bcrypt_Password
	}).then(data => {
		return res.send({
			msg: '注册成功',
			code: 200
		})
	}).catch(err => {
		return res.send({
			msg: "注册失败，问开发者",
			code: 451
		})
	})

});

// 登录 
router.post('/login', async (req, res) => {
	let {
		email,
		password
	} = req.body

	const user_Info = await Users.findOne({
		where: {
			email
		}
	})

	if (!user_Info) {
		return res.send({
			msg: '用户不存在，先注册',
			code: 600
		})
	}

	const {
		uid
	} = user_Info.dataValues

	const check_password = bcrypt.compareSync(password, user_Info.dataValues.password)
	if (!check_password) {
		return res.send({
			msg: '密码错误',
			code: 601
		})
	}
	const token = jwt.sign({
		uid //用户id和token密钥
	}, TOKEN_SECRET, {
		expiresIn: 3600 * 24 * 120
	})


	return res.send({
		msg: '登录成功',
		code: 200,
		token
	})
});

// 自动登录模块 (搁置)
router.post('/islogin', (req, res) => {
	let {
		token
	} = req.headers

	const {
		uid
	} = jwt.verify(token, TOKEN_SECRET)
})






module.exports = router;

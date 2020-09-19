const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TOKEN_SECRET = 'villiam_wok_2020_09_15'
const Users = require('../database/models/Users.js')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


router.post('/email', (req, res) => {
	let {
		Email_Tool,
		user
	} = require('../common/mail/sendMail.js');

	let {
		email
	} = req.body; //前端发送来的验证邮箱
	// 数据持久化 便于验证
	req.sessionStore.verify = Email_Tool.verify;
	req.sessionStore.email = email;

	const verify = async (request, response, next) => {

		const template = ejs.compile(fs.readFileSync(path.join(__dirname, '../common/mail/email.ejs'), 'utf8'));
		
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
		
		const info = await Email_Tool.transporter.sendMail(mailOptions)
			.then(data =>
				res.send({
					msg: '验证码发送成功',
					code: 200
				})
			)
			.catch(err => {
				res.send({
					code: 421,
					msg: '发送失败，请检查邮箱',
				})
			})
	};
	verify()
})


// 注册
router.post('/register', async (req, res) => {
	let {
		username,
		password,
		verify,
		email
	} = req.body

	if (email !== req.sessionStore.email || verify !== req.sessionStore.verify) {
		res.send({
			msg: "验证码校验错误",
			// + req.sessionStore.email + req.sessionStore.verify,
			status: 409
		});
		return false
	}

	let bcrypt_Password = bcrypt.hashSync(password, 5)

	const model = await Users.findOne({
		where: {
			email
		}
	})
	// console.log(model)
	if (model) {
		return res.send('user exists!')
	}
	const user = await Users.create({
		email,
		password: bcrypt_Password
	})
	console.log(user.dataValues)
	res.send({
		email,
		password
	})
});

// 登录 
router.post('/login', async (req, res) => {
	let {
		username,
		password
	} = req.body
	const user_Info = await Users.findOne({
		where: {
			username
		}
	})
	const {
		uid
	} = user_Info.dataValues

	if (!user_Info) {
		return res.send({
			msg: '用户不存在，先注册'
		})
	}
	const check_password = bcrypt.compareSync(password, user_Info.dataValues.password)
	if (!check_password) {
		return res.send({
			msg: '密码错误'
		})
	}
	const token = jwt.sign({
		uid //用户id和乱写的token密钥
	}, TOKEN_SECRET, {
		expiresIn: 3600 * 24 * 120
	})


	return res.send({
		msg: '暂时成功',
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

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

// 注册
router.post('/register', async (req, res) => {
	let {
		username,
		password
	} = req.body,
		bcrypt_Password = bcrypt.hashSync(password, 5)

	const model = await Users.findOne({
		where: {
			username
		}
	})
	// console.log(model)
	if (model) {
		return res.send('user exists!')
	}
	const user = await Users.create({
		username,
		password: bcrypt_Password
	})
	console.log(user.dataValues)
	res.send({
		username,
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


router.get('/email', (req, res) => {
	var {
		Email,
		user
	} = require('../common/mail/sendMail.js');
	// var email = req.query.email; //前端发送来的邮箱

	


	var verify = async (reqq, ress, next) => {
		var email = 'zhangwei@syncsoft.com'
		
		const template = ejs.compile(fs.readFileSync(path.join(__dirname, '../common/mail/email.ejs'), 'utf8'));
		const html = template({
			title: 'Ejs',
			desc: '使用Ejs渲染模板',
		});

		var mailOptions = { //发送给用户显示的字段

			from: `VWOK ${user}`,
			to: email,
			subject: '注册VWOK邮箱验证',
			text: '验证码：' + Email.verify,
			html
		}
		var info = await Email.transporter.sendMail(mailOptions)
		if (info) {
			res.send({
				msg: '验证码发送成功',
				status: 0
			});
		} else {
			res.send({
				msg: '验证码发送失败',
				status: -1
			});
		}
	};
	verify()
})




module.exports = router;

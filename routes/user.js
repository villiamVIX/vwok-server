const express = require('express');


const Users = require('../database/models/Users.js')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const router = express.Router();

// 邮箱模板
const template = ejs.compile(fs.readFileSync(path.join(__dirname, '../common/Mail_Tools/email.ejs'), 'utf8'));

// 数据操作层
import CTRL_User from "../controller/CTRL_User.js";

// 校验层
import Check from '../middlewares/check/check.js'

// 封装的邮件发送工具
const {
	Email_Tool, // 邮件工具类
	Email_Master_User, // 发射邮箱账号
	Send_Email_Tool // 邮件发射工具
} = require('../common/Mail_Tools/Send_Mail.js');


// 重置密码-邮箱验证
router.post('/forgot/email', Check.Check_Not_Exist, async (req, res) => {

	let {
		email
	} = req.body; //前端发送来的验证邮箱

	// 数据持久化 便于验证
	req.sessionStore.verify = Email_Tool.verify;
	req.sessionStore.email = email;

	console.log(`重置密码验证码:${req.sessionStore.verify}`);
	const html = template({
		title: 'VWOK 密码重置',
		verify: req.sessionStore.verify,
		email,
		motivation: '重置',
		object: '密码'
	});

	const mailOptions = { //发送给用户显示的字段
		from: `VWOK ${Email_Master_User}`,
		to: email,
		subject: 'VWOK重置密码验证', // 邮件标题
		html // ejs邮件模板
	}
	Send_Email_Tool(res, mailOptions)

})

// 重置密码
router.post('/forgot/reset/password', Check.Check_Verify, CTRL_User.Reset_Password)


// 注册-邮箱验证
router.post('/register/email', Check.Check_Exist, (req, res) => {

	let {
		email
	} = req.body; //前端发送来的验证邮箱

	// 数据持久化 便于验证
	req.sessionStore.verify = Email_Tool.verify;
	req.sessionStore.email = email;

	console.log(req.sessionStore.verify)

	const html = template({
		title: 'VWOK 验证码',
		verify: req.sessionStore.verify,
		email,
		motivation: '注册',
		object: '账号'
	});

	const mailOptions = { //发送给用户显示的字段
		from: `VWOK ${Email_Master_User}`,
		to: email,
		subject: '注册VWOK邮箱验证', // 邮件标题
		html // ejs邮件模板
	}

	Send_Email_Tool(res, mailOptions)

})

// 注册
router.post('/register', Check.Check_Verify, CTRL_User.Create_User)
	
// 登录 Check.Check_Not_Exist
router.post('/login',Check.Check_Not_Exist,CTRL_User.Login);

// 自动登录模块 (搁置)
router.post('/islogin', (req, res) => {
	let {
		token
	} = req.headers

	// const {
	// 	uid
	// } = jwt.verify(token, TOKEN_SECRET)
})



module.exports = router;
// export default router

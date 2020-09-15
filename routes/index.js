const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TOKEN_SECRET = 'villiam_wok_2020_09_15'
const Users = require('../database/models/Users.js')


const router = express.Router();

router.get('/', function(req, res, next) {	
  res.render('index', { title: 'Express' });
});

// 注册
router.post('/register', async(req, res) => {	
	let {username,password} = req.body,
	bcrypt_Password = bcrypt.hashSync(password,5)

	const model = await Users.findOne({where:{username}})
	// console.log(model)
	if(model){
		return res.send('user exists!')
	}
	const user= await Users.create({username,password:bcrypt_Password})
	console.log(user.dataValues)
	res.send({username,password})
});

// 登录 
router.post('/login', async(req, res) => {	
	let {username,password} = req.body
	const user_Info = await Users.findOne({where:{username}})
	const {uid} = user_Info.dataValues
	
	if(!user_Info){
		return res.send({msg:'用户不存在，先注册'})
	}
	const check_password = bcrypt.compareSync(password,user_Info.dataValues.password)
	if(!check_password){
		return res.send({msg:'密码错误'})
	}
	const token = jwt.sign({
		uid //用户id和乱写的token密钥
	}, TOKEN_SECRET, {
		expiresIn: 3600 * 24 * 120
	})
	
	
	return res.send({msg:'暂时成功',
	token})
});

// 自动登录模块
router.post('/islogin', (req, res) => {
	let {
		token
	} = req.headers
	
	const {uid} = jwt.verify(token, TOKEN_SECRET)
	
	
	// if (token) {
	// 	jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
			
	// 		if (err) {
				
	// 			if (err.name === 'TokenExpiredError') {
	// 				console.log('验证码失效，重登！')
	// 				return res.status(401).send('验证码失效，请重登')
	// 			} else {
	// 				console.log('认证失败')
	// 				return res.status(401).json({
	// 					error: '认证失败'
	// 				})
	// 			}
	// 		} else {
				
	// 		}
	// 	})
	// } else {
	// 	console.log('no token!!!!!!!')
	// 	return res.status(403).json({
	// 		message: '提供认证码请！'
	// 	})
	// }
})


module.exports = router;

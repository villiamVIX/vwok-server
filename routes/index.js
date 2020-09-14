const express = require('express');
const bcrypt = require('bcrypt')
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
	console.log(model)
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
	console.log(user_Info)
	if(!user_Info){
		return res.send({msg:'用户不存在，先注册'})
	}
	const check_password = bcrypt.compareSync(password,user_Info.dataValues.password)
	if(!check_password){
		return res.send({msg:'密码错误'})
	}
	return res.send({msg:'暂时成功'})
});


module.exports = router;

const express = require('express'); // ?
const router = express.Router();  // 路由
const log = console.log; // 注解
const Users = require('../../database/models/Users.js') //数据库

// router.post(/^\/user/, async (req, res, next)=> {
// 	log(123333333333333333333333333333333333333333333333333)
	
	
	
// 	return res.send({
// 		msg: 'l ogoin'
// 	})
// 	next(); // 将控制转向下一个符合URL的路由  
// });


module.exports = router;
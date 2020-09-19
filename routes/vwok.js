const express = require('express');
const Main_Works = require('../database/models/Main_Works.js')
const Users = require('../database/models/Users.js')
const router = express.Router();

router.get('/woklist', async (req, res) => {
	// let {uid} = req.query
	// console.log(uid)
	// const user_works = await Main_Works.findAll({
	// 	where: {
	// 		creater_id:uid
	// 	},
	// 	// DESC从大到小排序
	// 	order: [[ 'updatedAt', 'DESC' ]],
	// })

	// res.send({user_works})
	// 解构赋值 1是currenPage的默认值
	
	// console.log(currentPage)
	// let limit = 3
	var {
		currentPage = 1,
		uid,
		limit=4
	} = req.query
	let offset = (currentPage - 1) * limit;
	let userList = await Main_Works.findAndCountAll({
		//offet去掉前多少个数据
		offset,
		//limit每页数据数量
		limit:Number(limit),
		where: {
			creater_id: uid
		},
		order: [
			['updatedAt', 'DESC']
		],

	}).then(data => {
		// console.log(res)
		let result = {};
		result.data = data.rows;
		result.total = data.count;
		res.send({
			result
		})
		return result;
	});
	// ctx.body = userList;
});


router.post('/create', async (req, res) => {
	let {
		wok_name,
		start_time,
		estimate_time,
		creater_name
	} = req.body
	console.log(req.body)
	console.log('数据' + wok_name,
		start_time,
		estimate_time,
		creater_name)


	const main_works = await Main_Works.create({
		wok_name,
		start_time,
		estimate_time,
		creater_name
	})
	if (main_works.dataValues) {
		return res.send({
			msg: '成功插入'
		})
	}
	console.log(main_works.dataValues)

});





module.exports = router;

const express = require('express');
const Main_Works = require('../database/models/Main_Works.js')
const Users = require('../database/models/Users.js')
const router = express.Router();


// 数据操作层
import CTRL_Vwok from "../controller/CTRL_Vwok.js";

router.get('/woklist', CTRL_Vwok.Get_WorkList);


router.post('/create', async (req, res) => {
	let {
		wok_name,
		start_time,
		estimate_time,
		creater_name，
		uid
	} = req.body



	console.log(ss)
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

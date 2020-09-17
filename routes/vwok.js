const express = require('express');
const Main_Works = require('../database/models/Main_Works.js')
const Users = require('../database/models/Users.js')
const router = express.Router();

router.get('/woklist',  async (req, res) => {
	let {uid} = req.query
	console.log(uid)
	const user_works = await Main_Works.findAll({
		where: {
			creater_id:uid
		}
	})
	
	res.send({user_works})
});


router.post('/create', async (req, res) => {
	let {
		wok_name,
		start_time,
		estimate_time,
		creater_name
	} = req.body
	console.log(req.body)
	console.log('数据'+wok_name,
		start_time,
		estimate_time,
		creater_name)
		
		
	const main_works = await Main_Works.create({
		wok_name,
		start_time,
		estimate_time,
		creater_name
	})
	console.log(main_works.dataValues)
});





module.exports = router;

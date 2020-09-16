const express = require('express');
const Main_Works = require('../database/models/Main_Works.js')
const router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
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

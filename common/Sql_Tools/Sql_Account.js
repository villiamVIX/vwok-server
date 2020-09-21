const Users = require('../../database/models/Users.js')

// check_type 反馈类型
const Cheak_Email_Existed = async (res, email) => {
	const is_Account = await Users.findOne({
		where: {
			email
		}
	}).then(data => {
		if (data !== null) {
			res.send({
				msg: '邮箱已存在',
				code: 450
			})
			return true
		}
		return false
	}).catch(err => {
		res.send({
			msg: '验证邮件是否注册失败',
			code: 423
		})
	})
	
	console.log(typeof(is_Account))
	return is_Account
}

// 查看邮箱是否不存在
const Cheak_Email_Not_Existed = async (res, email) => {
	const is_Account = await Users.findOne({
		where: {
			email
		}
	}).then(data => {
		if (data == null) {
			res.send({
				code: 424,
				msg: "该邮箱未注册"
			})
			return true
		}
		return false
	}).catch(err => {
		res.send({
			msg: '验证邮件是否注册失败',
			code: 423,
			err
		})
	})
}

module.exports = {
	Cheak_Email_Existed
}

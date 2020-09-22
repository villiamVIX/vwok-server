const Users = require('../../database/models/Users.js')




const Find_Account = async (email) => {
	const Account_Info = await Users.findOne({
		where: {
			email
		}
	})
	return Account_Info
}



// check_type 反馈类型
const Cheak_Email_Existed = async (res, email) => {

	let get_Account_Info = await Find_Account(email)
		.then(data => {
			if (data !== null) { // 已有邮箱就进入 没有return false
				res.send({
					msg: '邮箱已存在',
					code: 450
				})
				return data
			}
			return false
		}).catch(err => {
			res.send({
				msg: '验证邮件是否注册失败',
				code: 422
			})
		})
	return get_Account_Info
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
	Find_Account,
	Cheak_Email_Existed
}

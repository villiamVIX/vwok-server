const Users = require('../../database/models/Users.js')
const bcrypt = require('bcrypt')


// ---------------------------------------------数据层
const Cheak_User_Existed = async (email) => { // 查是否有用户
	const Account_Info = await Users.findOne({
		where: {
			email
		}
	})
	return Account_Info
}

const Create_User = async (username, email, bcrypt_Password) => { // 新增用户
	const User_Info = await Users.create({
		username,
		email,
		password: bcrypt_Password
	})
	return User_Info
}

const Reset_Password = async (email, password) => { // 重置密码
	let newpsw = {
		password:bcrypt.hashSync(password, 5) // 加密
	}

	const User_Info = await Users.update(
		newpsw, {
			'where': {
				email
			}
		}
	)
	return User_Info
}

// ---------------------------------------------操作层

const server_Reset_Password = async (res, email, bcrypt_Password) => { // 重置密码
	let sql_data = await Reset_Password(username, email, bcrypt_Password)
		.then(data => {
			return res.send({
				msg: '重置成功',
				code: 200
			})
		}).catch(err => {
			return res.send({
				msg: "重置密码失败，检查数据",
				code: 452
			})
		})
}

const server_Create_User = async (res, username, email, bcrypt_Password) => {
	let sql_data = await Create_User(username, email, bcrypt_Password)
		.then(data => {
			return res.send({
				msg: '注册成功',
				code: 200
			})
		}).catch(err => {
			return res.send({
				msg: "注册失败，检查数据",
				code: 451
			})
		})
}


// check_type 反馈类型
const server_Cheak_User_Existed = async (res, email) => {

	let get_Account_Info = await Cheak_User_Existed(email)
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
const server_Cheak_User_Not_Existed = async (res, email) => {

	let get_Account_Info = await Cheak_User_Existed(email)
		.then(data => {
			if (data == null) { // 已有邮箱就进入 没有return false
				res.send({
					code: 424,
					msg: "该邮箱未注册"
				})
				return false
			}
			return data
		}).catch(err => {
			res.send({
				msg: '验证邮件是否注册失败',
				code: 422
			})
		})
	return get_Account_Info

}

module.exports = {
	Cheak_User_Existed,
	Create_User,
	Reset_Password,
	server_Create_User,
	server_Cheak_User_Existed,
	server_Cheak_User_Not_Existed,
}

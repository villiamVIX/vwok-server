// 数据操作层
const CTRL_User = require('../../controller/CTRL_User.js')
const bcrypt = require('bcrypt')

class Check {
	constructor() {

	}
	async Check_Verify(req, res, next) {
		let {
			email,
			verify
		} = req.body;
		if (email !== req.sessionStore.email || verify !== req.sessionStore.verify) {
			res.send({
				msg: "验证码校验错误",
				code: 422
			});
			return false
		}
		next()
	}
	async Check_Exist(req, res, next) {
		let user_Info = await CTRL_User.Find_User_By_Email(req, res)

		if (user_Info) {
			return res.send({
				msg: '邮箱已占用',
				code: 450
			})
		}

		next()
	}
	async Check_Not_Exist(req, res, next) {
		let user_Info = await CTRL_User.Find_User_By_Email(req, res)

		if (!user_Info) {
			return res.send({
				msg: '邮箱未注册',
				code: 424
			})
		}

		next()
	}
	async Check_Password(req, res, next) {
		try {
			const User_Info = await CTRL_User.Find_User_By_Email(req, res)

			const check_password = bcrypt.compareSync(req.body.password, User_Info.dataValues.password)
			
			if (!check_password) {
				return res.send({
					msg: '密码错误',
					code: 601
				})
			}

		} catch (e) {
			return res.send({
				msg: "校验密码失败，检查数据",
				code: 604
			})
		}

		next()
	}
}

module.exports = new Check()

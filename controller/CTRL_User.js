import Users  from '../database/models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const TOKEN_SECRET = 'villiam_wok_2020_09_15'
const log = console.log


class CTRL_User {
	constructor() {
		
	}
	async Find_User_By_Email(req, res) {
		try {
			let {
				email
			} = req.body
			const Account_Info = await Users.findOne({
				where: {
					email
				}
			})
			return Account_Info
		} catch (e) {
			return res.send({
				code: 600,
				msg: '通过EMAIL查找用户失败，检查数据'
			})
		}
	}
	async Create_User(req, res, next) {
		try {
			let {
				username,
				email,
				password
			} = req.body

			const User_Info = await Users.create({
				username,
				email,
				password: bcrypt_Password
			})
			return res.send({
				User_Info,
				msg: '注册成功',
				code: 200
			})

		} catch (e) {
			res.send({
				code: 603,
				msg: '创建用户失败'
			})
		}

		next()
	}
	async Reset_Password(req, res, next) {
		try {
			let {
				email,
				password
			} = req.body; //前端发送来的验证邮箱

			let newpsw = {
				password: bcrypt.hashSync(password, 5) // 加密
			}

			const User_Info = await Users.update(
				newpsw, {
					'where': {
						email
					}
				}
			)
			return res.send({
				msg: '密码重置成功',
				code: 200
			})

		} catch (e) {
			return res.send({
				msg: "重置密码失败，检查数据",
				code: 452
			})
		}

		next()
	}
	async Login(req, res, next) {
		try {
			console.log(CTRL_User.Find_User_By_Email)
			const User_Info = await CTRL_User.Find_User_By_Email(req, res)
			log('12313123123')
			let {
				password,
				uid
			} = User_Info.dataValues

			const check_password = bcrypt.compareSync(req.body.password, password)

			if (!check_password) {
				return res.send({
					msg: '密码错误',
					code: 601
				})
			}

			const token = jwt.sign({
				uid //用户id和token密钥
			}, TOKEN_SECRET, {
				expiresIn: 3600 * 24 * 120
			})

			return res.send({
				msg: '登录成功',
				code: 200,
				token
			})
		} catch (e) {
			return res.send({
				msg: "校验密码失败，检查数据",
				code: 604
			})
		}

	}

}

export default new CTRL_User()

// 验证码校验
const Check_Verify = (req, res, email, verify) => {
	if (email !== req.sessionStore.email || verify !== req.sessionStore.verify) {
		res.send({
			msg: "验证码校验错误",
			code: 422
		});
		return false
	}
	return true
}

module.exports = {
	Check_Verify
};
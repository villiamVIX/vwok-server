# wok-server
报工系统后台

status_code:{
	200:正常
	---------------
	421:邮箱发送失败
	422:注册验证码校验失败
	423:验证邮件是否存在失败
	424:邮箱未注册
	---------------
	450:邮箱被占用
	451:注册抛出错误
	---------------
	600:用户不存在
	601:密码错误
}
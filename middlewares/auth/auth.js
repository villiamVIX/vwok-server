import express from "express"; // ?
const router = express.Router(); // 路由
const Users = require("../../database/models/Users.js"); //数据库
import Auth_Jwt from "../../middlewares/auth/Auth_Jwt";

function is_Token_Ok(req) {
  let token = req.headers.authorization;
  let jwt = new Auth_Jwt(token); // 调用jwt方法
  let isLogin = jwt.Verify_Token(); //校验jwt
  return isLogin;
}

router.all(/^\/vwok/, async (req, res, next) => {
  const isLogin = is_Token_Ok(req);

  console.log(`
  **********************
  登录状态：${isLogin}
  **********************`);

  isLogin.msg == "Been_Login" ? next() : res.status(401).send({ msg: isLogin });
});

/*
 因为 Vwok 的报工路由都走上面的方法
 所以 可以在上面的res.decode获取用户的email，从而查询到对应的信息，明日增加autologin接口
*/ 

module.exports = router;

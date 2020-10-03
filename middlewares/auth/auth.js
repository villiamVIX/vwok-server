import express from "express"; // ?
const router = express.Router(); // 路由
const Users = require("../../database/models/Users.js"); //数据库
import Auth_Jwt from "../../middlewares/auth/Auth_Jwt";

router.post(/^\/vwok/, async (req, res, next) => {
  let { token } = req.headers;

  let jwt = new Auth_Jwt(token); // 调用jwt方法
  let isLogin = jwt.Verify_Token(); //校验jwt

  console.log(isLogin);

  isLogin == "Been_Login" ? next() : res.status(401).send({ msg: "Not_Login" });

});

module.exports = router;

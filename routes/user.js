const express = require("express");

const Users = require("../database/models/Users.js");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const router = express.Router();

// 邮箱模板
const template = ejs.compile(
  fs.readFileSync(
    path.join(__dirname, "../common/Mail_Tools/email.ejs"),
    "utf8"
  )
);

// 数据操作层
import CTRL_User from "../controller/CTRL_User.js";

// 校验层
import Check from "../middlewares/check/check.js";

// 封装的邮件发送工具
const {
  Email_Tool, // 邮件工具类
  Email_Master_User, // 发射邮箱账号
  Send_Email_Tool, // 邮件发射工具
} = require("../common/Mail_Tools/Send_Mail.js");

/**
 * @api {post} /user/forgot/email 邮箱验证-重置密码
 * @apiName forgot-email
 * @apiGroup 邮箱验证
 * @apiParam {string} email 已注册的邮箱
 * @apiSuccessExample {json} Success-Response:
 *  {
 *     "msg": "验证码发射成功",
 *     "code": 200
 *   }
 * @apiSampleRequest /user/forgot/email
 * @apiVersion 0.1.1
 */
router.post("/forgot/email", Check.Check_Not_Exist, async (req, res) => {
  let { email } = req.body; //前端发送来的验证邮箱

  // 数据持久化 便于验证
  req.sessionStore.verify = Email_Tool.verify;
  req.sessionStore.email = email;

  console.log(`重置密码验证码:${req.sessionStore.verify}`);
  const html = template({
    title: "VWOK 密码重置",
    verify: req.sessionStore.verify,
    email,
    motivation: "重置",
    object: "密码",
  });

  const mailOptions = {
    //发送给用户显示的字段
    from: `VWOK ${Email_Master_User}`,
    to: email,
    subject: "VWOK重置密码验证", // 邮件标题
    html, // ejs邮件模板
  };
  Send_Email_Tool(res, mailOptions);
});


/**
 * @api {post} /user/register/email 邮箱验证-注册
 * @apiName register-email
 * @apiGroup 邮箱验证
 * @apiParam {string} email 未注册的邮箱
 * @apiSuccessExample {json} Success-Response:
 *  {
 *     "msg": "验证码发射成功",
 *     "code": 200
 *  }
 * @apiSampleRequest /user/register/email
 * @apiVersion 0.1.1
 */
router.post("/register/email", Check.Check_Exist, (req, res) => {
  let { email } = req.body; //前端发送来的验证邮箱

  // 数据持久化 便于验证
  req.sessionStore.verify = Email_Tool.verify;
  req.sessionStore.email = email;

  console.log(req.sessionStore.verify);

  const html = template({
    title: "VWOK 验证码",
    verify: req.sessionStore.verify,
    email,
    motivation: "注册",
    object: "账号",
  });

  const mailOptions = {
    //发送给用户显示的字段
    from: `VWOK ${Email_Master_User}`,
    to: email,
    subject: "注册VWOK邮箱验证", // 邮件标题
    html, // ejs邮件模板
  };

  Send_Email_Tool(res, mailOptions);
});

/**
 * @api {post} /user/register 注册
 * @apiName register
 * @apiGroup 用户
 * @apiParam {string} email 已注册的邮箱
 * @apiParam {string} password 密码
 * @apiParam {number} verify 邮箱验证码
 * @apiParam {string} username 用户名
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      -"User_Info": {
 *      "uid": "865050c0-055d-11eb-ab69-57a5f8dc98a0",
 *      "username": "villiam",
 *      "email": "1059448504@qq.com",
 *      "password": "$2b$05$2CHrD6MxNcvdvY3w/7YtqOpnfBGHq1g7z2ffghtNml/fk.Gn7MR2e",
 *      "updatedAt": "2020-10-03T09:48:00.846Z",
 *      "createdAt": "2020-10-03T09:48:00.846Z"
 *      },
 *      "msg": "注册成功",
 *      "code": 200
 *   }
 * @apiSampleRequest /user/register
 * @apiVersion 0.1.1
 */
router.post("/register", Check.Check_Verify, CTRL_User.Create_User);


/**
 * @api {post} /user/forgot/reset/password 重置密码
 * @apiDescription 需要先获取邮箱验证码
 * @apiName forgot-reset-password
 * @apiGroup 用户
 * @apiParam {string} email 已注册的邮箱
 * @apiParam {string} password 密码
 * @apiParam {number} verify 邮箱验证码
 * @apiSuccessExample {json} Success-Response:
 *  {
 *     "msg": "密码重置成功",
 *     "code": 200
 *  }
 * @apiSampleRequest /user/forgot/reset/password
 * @apiVersion 0.1.1
 */
router.post("/forgot/reset/password",Check.Check_Verify,CTRL_User.Reset_Password);

/**
 * @api {post} /user/login 登录
 * @apiDescription 登录
 * @apiName login
 * @apiGroup 用户
 * @apiParam {string} email 邮箱
 * @apiParam {string} password 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "msg": "登录成功",
 *    "code": 200,
 *    "token": "..PUNGdMxVQDJpLoT3......."
 *  }
 * @apiSampleRequest /user/login
 * @apiVersion 0.1.1
 */
router.post("/login", Check.Check_Not_Exist, CTRL_User.Login);

// 自动登录模块 (搁置)
router.post("/islogin", (req, res) => {
  let { token } = req.headers;

  // const {
  // 	uid
  // } = jwt.verify(token, TOKEN_SECRET)
});

module.exports = router;
// export default router

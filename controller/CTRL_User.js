import Users from "../database/models/Users.js";
import bcrypt from "bcrypt";
import Auth_Jwt from "../middlewares/auth/Auth_Jwt";

var that; // 改变this指向全局
class CTRL_User {
  constructor() {
    that = this;
  }
  async Find_User_By_Email(req, res) {
    try {
      let { email } = req.body;
      const Account_Info = await Users.findOne({
        where: {
          email,
        },
      });
      return Account_Info;
    } catch (e) {
      return res.send({
        code: 600,
        msg: "通过EMAIL查找用户失败，检查数据",
      });
    }
  }
  async Create_User(req, res, next) {
    try {
      let { username, email, password } = req.body;

      const User_Info = await Users.create({
        username,
        email,
        password: bcrypt.hashSync(password, 5),
      });
      delete req.sessionStore.verify;
      return res.send({
        User_Info,
        msg: "注册成功",
        code: 200,
      });
    } catch (e) {
      res.send({
        code: 603,
        msg: "创建用户失败",
      });
    }

    next();
  }
  async Reset_Password(req, res, next) {
    try {
      let { email, password } = req.body; //前端发送来的验证邮箱

      let newpsw = {
        password: bcrypt.hashSync(password, 5), // 加密
      };

      const User_Info = await Users.update(newpsw, {
        where: {
          email,
        },
      });
      delete req.sessionStore.verify;
      return res.send({
        msg: "密码重置成功",
        code: 200,
      });
    } catch (e) {
      return res.send({
        msg: "重置密码失败，检查数据",
        code: 452,
      });
    }

    next();
  }
  async Login(req, res, next) {
    try {
      // that 改变this指向
      const User_Data = await that.Find_User_By_Email(req, res);
      let User_Info = User_Data.dataValues;
      let { password, uid, email } = User_Info;

      const check_password = bcrypt.compareSync(req.body.password, password);

      if (!check_password) {
        return res.send({
          msg: "密码错误",
          code: 601,
        });
      }

      const Jwt_User_Info = {
        email,
        password,
        uid,
      };

      let jwt = new Auth_Jwt(Jwt_User_Info); // 调用jwt方法
      let Token = jwt.Create_Token(); //生成jwt
      return res.send({
        msg: "登录成功",
        code: 200,
        Token,
        User_Info
      });
    } catch (e) {
      return res.send({
        msg: "校验密码失败，检查数据",
        code: 604,
      });
    }
  }

  async Auto_Login(req, res, next) {
    try {
      console.log(req.headers);
    } catch (error) {
      
    }
  }
}

export default new CTRL_User();

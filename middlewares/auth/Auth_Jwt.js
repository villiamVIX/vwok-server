import jwt from "jsonwebtoken";
const TOKEN_SECRET = "villiam_wok_2020_09_15";

class Jwt_Util {
  constructor(User_Info) {
    this.User_Info = User_Info;
  }
  Create_Token() {
    let User_Info = this.User_Info;
    let token = jwt.sign(User_Info, TOKEN_SECRET, {
      expiresIn: 3600 * 24 * 120,
    });
    return token;
  }
  Verify_Token() {
    let token = this.User_Info;
    var res={};
    try {
      let result = jwt.verify(token, TOKEN_SECRET, (err, payload) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            console.log("token过期，重登！");
            res.msg = "Token_Time_Out";
          } else {
            console.log("token有问题");
            res.msg = "Token_Error";
          }
        } else {
          res.data = payload;
          res.msg = "Been_Login";
        }
      });
      console.log(res)
      return res;
    } catch (error) {
      return error;
    }
  }
}

export default Jwt_Util;

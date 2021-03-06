import userRouter from "./user";
import vwokRouter from "./vwok";
import vwokItemRouter from "./vwok_item";
// 中间件 - 登录校验
const auth = require("../middlewares/auth/auth.js");


export default app => {
  app.use("/", auth);
  app.use("/user", userRouter);
  app.use("/vwok", vwokRouter);
  app.use("/vwok/item", vwokItemRouter);
}
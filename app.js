const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const { port, session_cfg } = require("./config/default");
import router from './routes/index_routers'
require("./common/Utils/util");

// 中间件 - 登录校验
const app = express();

app.all("*", (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || "*";
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", "Express");
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 配置session(需要配置在路由之前)
app.use(session(session_cfg));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json()); // 解析传入的数据
app.use(
  express.urlencoded({
    extended: false,
  })
); // 设置请求格式
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// load router
router(app)
// init dbs
require("./database/init.js");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(
  port,
  console.log(`
                                              #############################
                                               服务启动 端口${port}
                                              #############################
 `)
);

module.exports = app;

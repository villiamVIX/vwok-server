const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const userRouter = require("./routes/user");
const vwokRouter = require("./routes/vwok");
const vwokItemRouter = require("./routes/vwok_item");
const Util = require('./common/Utils/util')
const port = 3009;

// 中间件 - 登录校验
const auth = require("./middlewares/auth/auth.js");

const session = require("express-session");
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
app.use(
  session({
    secret: "$#%$%$%",
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      SameSite: "none",
      Secure: true,
    },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
); // 设置请求格式
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", auth);
app.use("/user", userRouter);
app.use("/vwok", vwokRouter);
app.use("/vwok/item", vwokItemRouter);


require("./database/init.js");
require("./database/models/vw_users.js");
require("./database/models/vw_works.js");
require("./database/models/subs/vw_works_items.js");


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

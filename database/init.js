const Sequelize = require("sequelize");
// const host = "v.coderv.cn";
// const host = "localhost";
const host = "8.129.33.2";

const sequelize = new Sequelize("vwok", "root", "zw11663", {
  host,
  dialect: "mysql",
  port: "3306",
  // 改时区
  timezone: "+08:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  define: {
    // 兼容存入中文
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`
		        #############################
		        成功连接到数据库，地址: ${host}
		        #############################
		`);
  })
  .catch((err) => {
    console.error("连接到服务器出错：", err);
  });

module.exports = {
  Sequelize,
  sequelize,
};

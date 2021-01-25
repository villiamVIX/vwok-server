const Sequelize = require("sequelize");
const DataTypes = require("sequelize/lib/data-types");
const Op = Sequelize.Op;
const host = "v.coderv.cn";
// const host = "localhost";
const DB = 'Vwok_Test'

const sequelize = new Sequelize(DB, "root", "zw11663", {
  host,
  dialect: "mysql",
  port: "33060",
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
		                ##########################################################
		                    成功连接到数据库，地址: ${host};库：${DB}
		                ##########################################################
		`);
  })
  .catch((err) => {
    console.error("连接到服务器出错：", err);
  });

module.exports = {
  Sequelize,
  sequelize,
  DataTypes,
  Op
};

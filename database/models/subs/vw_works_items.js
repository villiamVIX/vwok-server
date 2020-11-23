const { Sequelize, sequelize } = require("../../init");

const DataTypes = require("sequelize/lib/data-types");
const db_Name = "vw_works_items";

const vw_works_items = sequelize.define(db_Name, {
  vwok_item_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
    unique: true,
    comment: "子任务id主键",
  },
  vwok_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "主任务id",
  },
  uid: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    comment: "创建人id",
  },
  vwok_item_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    comment: "任务名",
  },
  start_time: {
    type: Sequelize.DATEONLY,
    defaultValue: new Date(),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    comment: "开始时间",
  },
  estimate_time: {
    type: Sequelize.DATEONLY,
    validate: {
      notEmpty: true,
    },
    comment: "预计完成时间",
  },
  jira: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
    comment: "jira单",
  },
  progress: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
    comment: "子任务进度",
  },
  remark: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
    comment: "备注",
  },
});

vw_works_items
  .sync({
    alter: true,
    // force:true
  })
  .then(() => {
    // 建表
    console.log(`${db_Name}表模型同步`);
  });

module.exports = vw_works_items;
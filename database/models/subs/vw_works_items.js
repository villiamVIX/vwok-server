const { Sequelize, sequelize, DataTypes, Op } = require("../../init");
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
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
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
  estimate_time: {
    type: Sequelize.DATEONLY,
    validate: {
      notEmpty: true,
    },
    comment: "预计完成时间",
  },
  jira: {
    type: Sequelize.STRING,
    comment: "jira单",
  },
  progress: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
    comment: "子任务进度",
  },
  scroll_estimate: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
    },
    defaultValue: 100, // 默认百分百进度
    comment: "滑动条预计进度",
  },
  scroll_actual: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
    },
    defaultValue: 0, // 默认0进度
    comment: "滑动条实际进度",
  },
  remark: {
    type: Sequelize.STRING,
    comment: "备注",
  },
});

vw_works_items
  .sync({
    alter: true,
    // force: true,
  })
  .then(() => {
    // 建表
    console.log(`${db_Name}表模型同步`);
  });

module.exports = { vw_works_items, Op };

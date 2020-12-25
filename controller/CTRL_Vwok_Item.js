import vw_users from "../database/models/vw_users.js";
import vw_works from "../database/models/vw_works.js";
import { vw_works_items, Op } from "../database/models/subs/vw_works_items.js";

vw_works_items.belongsTo(vw_works, { foreignKey: "vwok_id", as: "vw_works" });

var that; // 改变this指向全局
class CTRL_Vwok_Item {
  constructor() {
    that = this;
  }
  // 查询个人工项
  async Get_Item(req, res) {
    try {
      let { vwok_id } = req.query;
      let wokList = await vw_works_items.findAll({
        where: { vwok_id },
        order: [["createdAt", "DESC"]],
      });
      res.send({ code: 200, result: wokList });
    } catch (error) {
      console.log(error);
      return res.send({
        msg: "查询子工项失败",
        code: 704,
      });
    }
  }
  // 查询团队成员
  async Get_TeammateList(req, res) {
    try {
      let userList = await vw_users.findAll({
        attributes: ["uid", "username"],
      });

      res.send({ code: 200, result: userList });
    } catch (error) {
      return res.send({
        msg: "获取团队成员失败",
        code: 703,
      });
    }
  }
  // 新建工项
  async Create_Wok_Item(req, res) {
    try {
      let { vwok_item_name, uid, vwok_id } = req.body;

      const wok_item = await vw_works_items.create({
        vwok_item_name,
        uid,
        vwok_id,
      });
      let new_items = await vw_works_items.findAll({
        where: { vwok_id },
        order: [["createdAt", "DESC"]],
      });

      return res.send({ result: new_items, msg: "新建子工项成功", code: 200 });
    } catch (error) {
      console.log(error);
      return res.send({ msg: "新建子工项出错", code: 702 });
    }
  }
  // 更新工项
  async Update_Wok_Item(req, res) {
    try {
      let { vwok_id } = req.body[0]; // 获取子工项上一级ID

      let data_Len = req.body.length;
      for (let i = 0; i < data_Len; i++) {
        let current_Id = req.body[i].vwok_item_id;
        let current_Data = req.body[i];
        console.log(current_Data);
        await vw_works_items.update(current_Data, {
          where: { vwok_item_id: current_Id },
        });
      }
      let new_items = await vw_works_items.findAll({
        where: { vwok_id },
        order: [["updatedAt", "DESC"]],
      });

      return res.send({ result: new_items, code: 200 });
    } catch (error) {
      return res.send({ msg: "更新工项出错", code: 705 });
    }
  }
  async Get_Today_Wok(req, res) {
    try {
      let today = new Date().Format("yyyy-MM-dd");
      let { uid, date = today } = req.query; // 可导出指定日期之后
      // 待开发：导出~段时间工项
      console.log(date);
      // 模糊查询当日改动的工项
      let wokList = await vw_works_items.findAll({
        where: {
          uid, // 根据UID
          updatedAt: { [Op.gte]: "%" + today + "%" }, // 大于现有日期
        },
        include: [
          {
            model: vw_works, // 关联查询
            as: "vw_works",  // 别名 
            attributes: ["vwok_name"], // 查询字段
          },
        ],
        order: [["updatedAt", "DESC"]],
      });
      console.log(wokList);
      return res.send({
        result: { wokList, today },
        code: 200,
        msg: "获取今日预计工项成功",
      });
    } catch (error) {
      return res.send({ msg: "获取今日预计工项失败", code: 705, error });
    }
  }
}

export default new CTRL_Vwok_Item();

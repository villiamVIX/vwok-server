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
      // let {uid} = req.User

      let { vwok_id } = req.query;

      let wokList = await vw_works_items.findAll({
        where: { vwok_id },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: vw_works, // 关联查询
            as: "vw_works", // 别名
            attributes: ["vwok_name"], // 查询字段
          },
        ],
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
  // 更新工项V2.0
  async FindBy_Vwok_id(req, res) {
    try {
      let { vwok_id } = req.body.queryData;
      console.log(vwok_id);
      let new_items = await vw_works_items.findAll({
        where: { vwok_id },
        order: [["updatedAt", "DESC"]],
        include: [
          {
            model: vw_works, // 关联查询
            as: "vw_works", // 别名
            attributes: ["vwok_name"], // 查询字段
          },
        ],
      });
      return res.send({ result: new_items, code: 200 });
    } catch (error) {
      return res.send({ msg: "查询工项出错_By_Vwok_id", code: 707 });
    }
  }
  async Update_Wok_Item(req, res, next) {
    try {
      for (let i = 0, j = req.body.length; i < j; i++) {
        let current_Data = req.body[i];
        let { vwok_item_id, vwok_id } = current_Data;
        await vw_works_items.update(current_Data, {
          where: { vwok_item_id },
        });
        await vw_works.update(
          { vwok_id },
          {
            where: { vwok_id },
          }
        );
      }
      req.body.queryData = {
        vwok_id: req.body[0].vwok_id,
      };
      next();
    } catch (error) {
      return res.send({ msg: "更新工项出错", code: 705 });
    }
  }
  // 获取今日工项
  async Get_Today_Vwok(req, res) {
    try {
      var today = new Date().Format("yyyy-MM-dd");
      // 获取token里的uid
      let { uid = req.User.uid, date = today } = req.query; // 可导出指定日期之后
      // 待开发：导出~段时间工项

      // 模糊查询当日改动的工项
      let wokList = await vw_works_items.findAll({
        where: {
          uid, // 根据UID
          updatedAt: { [Op.gte]: "%" + today + "%" }, // 大于现有日期
        },
        include: [
          {
            model: vw_works, // 关联查询
            as: "vw_works", // 别名
            attributes: ["vwok_name"], // 查询字段
          },
        ],
        order: [["updatedAt", "DESC"]],
      });
      console.log(wokList);
      return res.send({
        result: { wokList, today },
        code: 200,
        msg: "获取今日工项成功",
      });
    } catch (error) {
      return res.send({ msg: "获取今日工项失败", code: 706, error });
    }
  }
}

export default new CTRL_Vwok_Item();

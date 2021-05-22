import vw_users from "../database/models/vw_users.js";
import vw_works from "../database/models/vw_works.js";
import { vw_works_items, Op } from "../database/models/subs/vw_works_items.js";

vw_works_items.belongsTo(vw_works, { foreignKey: "vwok_id", as: "vw_works" });

var that; // 改变this指向全局

class CTRL_Vwok_Item {
  constructor() {
    that = this;
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
        code: 701,
      });
    }
  }
  // 新建工项
  async Create_Wok_Item(req, res, next) {
    try {
      let { vwok_item_name, uid, vwok_id } = req.body;
      const wok_item = await vw_works_items.create({
        vwok_item_name,
        uid,
        vwok_id,
      });
      req.body.queryData = { vwok_id };
      next();
    } catch (error) {
      console.log(error);
      return res.send({ msg: "新建子工项出错", code: 702 });
    }
  }
  // 查询工项V2.0
  async FindBy_Vwok_id(req, res) {
    try {
      // 对应三种接口 1.get查询 2.新建->查询 3.更新->查询
      const vwok_id =
        req.query.vwok_id || req.body.vwok_id || req.body.queryData.vwok_id;
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
      return res.send({ msg: "查询工项出错_By_Vwok_id", code: 703 });
    }
  }
  async Update_Wok_Item(req, res, next) {
    try {
      let { vwok_item_id, diff_data, vwok_id } = req.body;
      // console.log( vwok_item_id, diff_data, vwok_id );
      await vw_works_items.update(diff_data, { where: { vwok_item_id } });
      await vw_works.update({ vwok_id }, { where: { vwok_id } }); // 刷一下更改时间
      next();
    } catch (error) {
      console.log(error);
      return res.send({ msg: "更新工项出错", code: 704 });
    }
  }
  // 获取今日工项
  async Get_Today_Vwok(req, res) {
    try {
      // 获取token里的uid
      var currentDate = new Date().Format("yyyy-MM-dd"),
        // 默认获取传入时间，无则赋值当天
        { uid = req.User.uid, startDay = currentDate } = req.query,
        startDate = new Date(startDay),
        endDay = new Date(startDate.setDate(startDate.getDate() + 1)).Format(
          "yyyy-MM-dd"
        );

      console.log(startDay, endDay);
      // 模糊查询当日改动的工项
      let wokList = await vw_works_items.findAll({
        where: {
          uid, // 根据UID
          // updatedAt: { [Op.gte]: "%" + startDay + "%" }, // 大于现有日期
          updatedAt: {
            [Op.between]: [startDay, endDay],
          }, // 日期区间
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
        result: { wokList, startDay },
        code: 200,
        msg: "获取今日工项成功",
      });
    } catch (error) {
      return res.send({ msg: "获取今日工项失败", code: 705, error });
    }
  }
  async Del_Vwok_Item(req, res) {
    try {
      let data = req.body.data,
        User_uid = req.User.uid;
        
      for (let i = 0, j = data.length; i < j; i++) {
        console.log(data[i]);
        let { uid, vwok_item_id } = data[i];
        if (User_uid !== uid) {
          return res.send({
            code: 0,
            msg: "只可删除本人创建的工项",
          });
        }
        await vw_works_items.destroy({
          where: {
            vwok_item_id,
          },
        });
      }
      console.log('删除成功');
      return res.send({
        code: 200,
        msg: "工项已删除",
      });
    } catch (error) {
      console.log(JSON.stringify(error));

      return res.send({ msg: "删除工项失败", code: 706 });
    }
  }
}

export default new CTRL_Vwok_Item();

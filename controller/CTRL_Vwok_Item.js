import vw_users from "../database/models/vw_users.js";
import vw_works from "../database/models/vw_works.js";
import vw_works_items from "../database/models/subs/vw_works_items.js";

var that; // 改变this指向全局
class CTRL_Vwok_Item {
  constructor() {
    that = this;
  }
  // 查询个人工项
  async Get_Item(req, res) {
    try {
      let { vwok_id } = req.query;
      let wokList = await vw_works_items.findAll({ where: { vwok_id } });
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
      console.log(wok_item.dataValues);
      return res.send({ msg: "新建子工项成功", code: 200 });
    } catch (error) {
      console.log(error);
      return res.send({ msg: "新建子工项出错", code: 702 });
    }
  }
  // 更新工项
  async Update_Wok_Item(req, res) { // 更新未生效
    let vwok_item_id = "d60a1190-2bd3-11eb-b4d2-a902bbce58cd3";
    let vwok_item_name = "aiskdjoa打撒送到家了";
    const wok_item = await vw_works_items.update(
      {
        vwok_item_name: "test2",
      },
      {
        where: { vwok_item_id: vwok_item_id },
      }
    );
    return res.send({ wok_item, code: 200 });
    try {
    } catch (error) {}
  }
}

export default new CTRL_Vwok_Item();

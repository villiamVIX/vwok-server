import vw_users from "../database/models/vw_users.js";
import vw_works from "../database/models/vw_works.js";

var that; // 改变this指向全局
class CTRL_Vwok {
  constructor() {
    that = this;
  }
  // 查询个人工项
  async Get_WokList(req, res) {
    try {
      var { currentPage = 1, uid, limit = 10 } = req.query;
      let offset = (currentPage - 1) * limit;
      let wokList = await vw_works.findAndCountAll({
        //offet去掉前多少个数据
        offset,
        //limit每页数据数量
        limit: Number(limit),
        where: { uid },
        order: [["updatedAt", "DESC"]],
      });
      
      let { rows, count } = wokList;
      let { data, total } = { data: rows, total: count };
      let result = { data, total };

      res.send({ code: 200, result });
    } catch (error) {
      return res.send({
        msg: "查询工作列表失败",
        code: 700,
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
  async Create_Wok(req, res) {
    try {
      let {
        vwok_name,
        start_time,
        estimate_time,
        creater_name,
        uid,
        teammate,
      } = req.body;
      // 对队友字段做转换
      if(Array.isArray(teammate)){
        teammate = teammate.join(",")
      }

      const main_works = await vw_works.create({
        vwok_name,
        start_time,
        estimate_time,
        creater_name,
        uid,
        teammate,
      });
      console.log(main_works.dataValues);
      return res.send({ msg: "新建工项成功", code: 200 });
    } catch (error) {
      console.log(error);
      return res.send({ msg: "新建工项出错", code: 701 });
    }
  }
}

export default new CTRL_Vwok();

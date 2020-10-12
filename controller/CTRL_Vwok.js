import Users from "../database/models/Users.js";
import Main_Works from "../database/models/Main_Works.js";

var that; // 改变this指向全局
class CTRL_Vwok {
  constructor() {
    that = this;
  }
  async Get_WorkList(req, res) {
    try {
      var { currentPage = 1, uid, limit = 10 } = req.query;
      let offset = (currentPage - 1) * limit;
      let userList = await Main_Works.findAndCountAll({
        //offet去掉前多少个数据
        offset,
        //limit每页数据数量
        limit: Number(limit),
        where: {
          creater_id: uid,
        },
        order: [["updatedAt", "DESC"]],
      });

      let { rows, count } = userList;
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
}

export default new CTRL_Vwok();

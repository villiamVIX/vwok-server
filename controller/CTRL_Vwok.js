import Users from "../database/models/Users.js";
import Main_Works from "../database/models/Main_Works.js";

var that; // 改变this指向全局
class CTRL_Vwok {
  constructor() {
    that = this;
  }
  // 查询个人工项
  async Get_WokList(req, res) {
    try {
      var { currentPage = 1, uid, limit = 10 } = req.query;
      console.log(uid);
      let offset = (currentPage - 1) * limit;
      let userList = await Main_Works.findAndCountAll({
        //offet去掉前多少个数据
        offset,
        //limit每页数据数量
        limit: Number(limit),
        where: {
          uid,
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
  // 新建工项
  async Create_Wok(req, res) {
    try {
      let { wok_name, start_time, estimate_time, creater_name, uid ,teammate} = req.body;
      teammate = teammate.toString()
      console.log(req.body);
      const main_works = await Main_Works.create({
        wok_name,
        start_time,
        estimate_time,
        teammate,
        creater_name,
        uid
      });

      console.log(main_works);
      if (main_works.dataValues) {
        return res.send({ msg: "新建工项成功", code: 200 });
      } else {
        return res.send({ msg: "新建工项失败", code: 702 });
      }
    } catch (error) {
      return res.send({ msg: "新建工项出错", code: 701 });
    }
  }
}

export default new CTRL_Vwok();

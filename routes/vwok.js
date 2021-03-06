const express = require("express");
const vw_works = require("../database/models/vw_works.js");
const vw_users = require("../database/models/vw_users.js");
const router = express.Router();

// 数据操作层
import CTRL_Vwok from "../controller/CTRL_Vwok.js";

router.get("/woklist", CTRL_Vwok.Get_WokList);

router.get("/teammate", CTRL_Vwok.Get_TeammateList);

router.post("/create",CTRL_Vwok.Create_Wok);
// 改工项名
router.post("/update/vwokname",CTRL_Vwok.Update_Vwok_Name);

// 终结工项
router.post("/end/vwok",CTRL_Vwok.End_Vwok,CTRL_Vwok.Get_WokList);

module.exports = router;
// export default router
const express = require("express");
const vw_works = require("../database/models/vw_works.js");
const vw_users = require("../database/models/vw_users.js");
const router = express.Router();

// 数据操作层
import CTRL_Vwok from "../controller/CTRL_Vwok.js";

router.get("/woklist", CTRL_Vwok.Get_WokList);

router.post("/create",CTRL_Vwok.Create_Wok);

module.exports = router;

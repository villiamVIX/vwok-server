const express = require("express");
const Main_Works = require("../database/models/Main_Works.js");
const Users = require("../database/models/Users.js");
const router = express.Router();

// 数据操作层
import CTRL_Vwok from "../controller/CTRL_Vwok.js";

router.get("/woklist", CTRL_Vwok.Get_WokList);

router.post("/create",CTRL_Vwok.Create_Wok);

module.exports = router;

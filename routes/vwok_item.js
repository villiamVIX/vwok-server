const express = require("express");
const router = express.Router();

// 数据操作层
import CTRL_Vwok_Item from "../controller/CTRL_Vwok_Item.js";

router.get("/getitem", CTRL_Vwok_Item.Get_Item);

router.get("/teammate", CTRL_Vwok_Item.Get_TeammateList);

router.post("/create",CTRL_Vwok_Item.Create_Wok_Item);

router.post("/update",CTRL_Vwok_Item.Update_Wok_Item,CTRL_Vwok_Item.FindBy_Vwok_id);

router.post("/update/today",CTRL_Vwok_Item.Update_Wok_Item,CTRL_Vwok_Item.Get_Today_Vwok);

router.get("/todayvwok",CTRL_Vwok_Item.Get_Today_Vwok);

module.exports = router;

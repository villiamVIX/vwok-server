const express = require("express");
const router = express.Router();

// 数据操作层
import CTRL_Vwok_Item from "../controller/CTRL_Vwok_Item.js";

/**
 * @api {get} /vwok/item/getitem 01-根据父工项获取个人子工项
 * @apiGroup 03-子工项
 * @apiParam {String} vwok_id 父工项id
 * @apiVersion 0.1.1
 * @apiParamExample {json} 请求样例:
 * {
 *  "vwok_id": "5a59de80-4588-11eb-89f0-d93442742f19"
 * }
 * @apiSuccessExample {json} 成功返回样例:
 *  {
 *  "code": 200,
    "result": [
        {
            "vwok_item_id": "64dd0fd0-4588-11eb-89f0-d93442742f19",
            "vwok_id": "5a59de80-4588-11eb-89f0-d93442742f19",
            "uid": "f4fb6480-2bd0-11eb-95e3-f54fb34fd803",
            "vwok_item_name": "测试卡控与资金流程",
            "start_time": "2020-12-23",
            "estimate_time": null,
            "jira": null,
            "progress": null,
            "scroll_estimate": 100,
            "scroll_actual": null,
            "remark": null,
            "createdAt": "2020-12-24 09:36:07",
            "updatedAt": "2020-12-30 09:20:35",
            "vw_works": {
                "vwok_name": "思明区_测试[人才个税奖励（新经济政策）]"
            }
        }
    ]  
 *  }
 */
router.get("/getitem", CTRL_Vwok_Item.FindBy_Vwok_id);

/**
 * @api {get} /vwok/item/teammate 02-获取团队成员
 * @apiGroup 03-子工项
 * @apiVersion 0.1.1
 * @apiSuccessExample {json} 成功返回样例:
 * {
    "code": 200,
    "result": [
        {
            "uid": "084bf9d0-24cb-11eb-b440-59b72ee97dd0",
            "username": "大黑"
        },
        {
            "uid": "814cf260-4a43-11eb-8058-b954b790117b",
            "username": "张威"
        }
    ]
 * }
 *  }
 */
router.get("/teammate", CTRL_Vwok_Item.Get_TeammateList);

/**
 * @api {post} /vwok/item/create 03-新建子工项
 * @apiGroup 03-子工项
 * @apiParam {String} vwok_item_name 工项名称
 * @apiParam {String} uid 用户id
 * @apiParam {String} vwok_id 父工项id
 * @apiVersion 0.1.1
 * @apiParamExample {json} 请求样例:
 * {
    "vwok_item_name": "实例数据",
    "uid": "f4fb6480-2bd0-11eb-95e3-f54fb34fd803 ",
    "vwok_id": "22bbda10-4587-11eb-89f0-d93442742f19 "
}
*
* @apiSuccessExample {json} 成功返回样例:
 {
    "result": 
    [{
		"vwok_item_id": "84f94080-6208-11eb-850c-479fe27ce40e",
        "vwok_id": "22bbda10-4587-11eb-89f0-d93442742f19",
        "uid": "f4fb6480-2bd0-11eb-95e3-f54fb34fd803",
        "vwok_item_name": "实例数据",
        "start_time": "2021-01-29",
        "estimate_time": null,
        "jira": null,
        "progress": null,
        "scroll_estimate": 100,
        "scroll_actual": null,
        "remark": null,
        "createdAt": "2021-01-29 16:03:49",
        "updatedAt": "2021-01-29 16:03:49",
        "vw_works": {
            "vwok_name": "思明区_客户问撒旦苏打阿斯"
        }
	}],
	"msg": "新建子工项成功",
	"code": 200
 *}
 */
router.post(
  "/create",
  CTRL_Vwok_Item.Create_Wok_Item,
  CTRL_Vwok_Item.FindBy_Vwok_id
);

/**
 * @api {post} /vwok/item/update 04-更新工项
 * @apiGroup 03-子工项
 * @apiParam {String} vwok_item_name 工项名称
 * @apiParam {String} uid 用户id
 * @apiParam {String} vwok_item_id 子工项id
 * @apiParam {String} vwok_id 父工项id
 * @apiParam {String} start_time 开始时间
 * @apiParam {String} estimate_time 结束时间
 * @apiParam {String} scroll_estimate 预计进度
 * @apiParam {String} scroll_actual 实际进度
 * @apiParam {String} remark 备注
 * @apiVersion 0.1.1
 * @apiParamExample {json} 请求样例:
[
    {
        "vwok_item_id": "13d14db0-5fb7-11eb-a0dc-fb06b46ac231 ",
        "vwok_id": "22bbda10-4587-11eb-89f0-d93442742f19 ",
        "uid": "f4fb6480-2bd0-11eb-95e3-f54fb34fd803 ",
        "vwok_item_name": "567  ",
        "start_time": "2021-01-26 ",
        "estimate_time": null,
        "jira": null,
        "progress": null,
        "scroll_estimate": 100,
        "scroll_actual": null,
        "remark": null,
        "createdAt": "2021-01-26 17:15:48",
        "updatedAt": "2021-01-26 17:21:55"
    }
]
*
* @apiSuccessExample {json} 成功返回样例:
 {
    "result": [
        {
           "vwok_item_id": "84f94080-6208-11eb-850c-479fe27ce40e",
            "vwok_id": "22bbda10-4587-11eb-89f0-d93442742f19",
            "uid": "f4fb6480-2bd0-11eb-95e3-f54fb34fd803",
            "vwok_item_name": "实例数据",
            "start_time": "2021-01-29",
            "estimate_time": null,
            "jira": null,
            "progress": null,
            "scroll_estimate": 100,
            "scroll_actual": null,
            "remark": null,
            "createdAt": "2021-01-29 16:03:49",
            "updatedAt": "2021-01-29 16:03:49",
            "vw_works": {
                "vwok_name": "思明区_客户问撒旦苏打阿斯"
            }
        },
        
    ],
    "code": 200
}
 */
router.post(
  "/update",
  CTRL_Vwok_Item.Update_Wok_Item,
  CTRL_Vwok_Item.FindBy_Vwok_id
);

/**
 * @api {post} /vwok/item/update/today 05-更新当日工项
 * @apiGroup 03-子工项
 * @apiDescription 与04相似,不再赘述.
 */
router.post(
  "/update/today",
  CTRL_Vwok_Item.Update_Wok_Item,
  CTRL_Vwok_Item.Get_Today_Vwok
);

/**
 * @api {post} /vwok/item/update/today 06-获取今日工项
 * @apiGroup 03-子工项
 * @apiDescription 与01相似,不再赘述.
 * @apiParam {String} date<code>可选</code> 自定义的导出日期
 * @apiParam {String} uid 用户id
 */
router.get("/todayvwok", CTRL_Vwok_Item.Get_Today_Vwok);

/**
 * @api {post} /vwok/item/update/today 07-删除工项
 * @apiGroup 03-子工项
 * @apiParam {String} date<code>可选</code> 自定义的导出日期
 * @apiParam {String} uid 用户id
 */
router.delete("/delete", CTRL_Vwok_Item.Del_Vwok_Item);


module.exports = router;
// export default router
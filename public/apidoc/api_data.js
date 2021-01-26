define({ "api": [
  {
    "type": "get",
    "url": "/vwok/item/getitem",
    "title": "01-根据父工项获取个人子工项",
    "group": "03-子工项",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vwok_id",
            "description": "<p>父工项id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求样例:",
          "content": "{\n \"vwok_id\": \"5a59de80-4588-11eb-89f0-d93442742f19\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.1",
    "success": {
      "examples": [
        {
          "title": "成功返回样例:",
          "content": "{\n\"code\": 200,\n   \"result\": [\n       {\n           \"vwok_item_id\": \"64dd0fd0-4588-11eb-89f0-d93442742f19\",\n           \"vwok_id\": \"5a59de80-4588-11eb-89f0-d93442742f19\",\n           \"uid\": \"f4fb6480-2bd0-11eb-95e3-f54fb34fd803\",\n           \"vwok_item_name\": \"测试卡控与资金流程\",\n           \"start_time\": \"2020-12-23\",\n           \"estimate_time\": null,\n           \"jira\": null,\n           \"progress\": null,\n           \"scroll_estimate\": 100,\n           \"scroll_actual\": null,\n           \"remark\": null,\n           \"createdAt\": \"2020-12-24 09:36:07\",\n           \"updatedAt\": \"2020-12-30 09:20:35\",\n           \"vw_works\": {\n               \"vwok_name\": \"思明区_测试[人才个税奖励（新经济政策）]\"\n           }\n       }\n   ]  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/vwok_item.js",
    "groupTitle": "03-子工项",
    "name": "GetVwokItemGetitem",
    "sampleRequest": [
      {
        "url": "http://localhost:3009/vwok/item/getitem"
      }
    ]
  },
  {
    "type": "get",
    "url": "/vwok/item/teammate",
    "title": "02-获取团队成员",
    "group": "03-子工项",
    "version": "0.1.1",
    "success": {
      "examples": [
        {
          "title": "成功返回样例:",
          "content": "{\n    \"code\": 200,\n    \"result\": [\n        {\n            \"uid\": \"084bf9d0-24cb-11eb-b440-59b72ee97dd0\",\n            \"username\": \"大黑\"\n        },\n        {\n            \"uid\": \"814cf260-4a43-11eb-8058-b954b790117b\",\n            \"username\": \"张威\"\n        }\n    ]\n}\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/vwok_item.js",
    "groupTitle": "03-子工项",
    "name": "GetVwokItemTeammate",
    "sampleRequest": [
      {
        "url": "http://localhost:3009/vwok/item/teammate"
      }
    ]
  },
  {
    "type": "post",
    "url": "/vwok/item/create",
    "title": "03-新建子工项",
    "group": "03-子工项",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vwok_item_name",
            "description": "<p>工项名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vwok_id",
            "description": "<p>父工项id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求样例:",
          "content": "{\n    \"vwok_item_name\": \"实例数据\",\n    \"uid\": \"f4fb6480-2bd0-11eb-95e3-f54fb34fd803 \",\n    \"vwok_id\": \"22bbda10-4587-11eb-89f0-d93442742f19 \"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.1.1",
    "success": {
      "examples": [
        {
          "title": "成功返回样例:",
          "content": " {\n\t\"result\": [{\n\t\t\"vwok_item_id\": \"13d14db0-5fb7-11eb-a0dc-fb06b46ac231\",\n\t\t\"vwok_id\": \"22bbda10-4587-11eb-89f0-d93442742f19\",\n\t\t\"uid\": \"f4fb6480-2bd0-11eb-95e3-f54fb34fd803\",\n\t\t\"vwok_item_name\": \"567 \",\n\t\t\"start_time\": \"2021-01-26\",\n\t\t\"estimate_time\": null,\n\t\t\"jira\": null,\n\t\t\"progress\": null,\n\t\t\"scroll_estimate\": 100,\n\t\t\"scroll_actual\": null,\n\t\t\"remark\": null,\n\t\t\"createdAt\": \"2021-01-26 17:15:48\",\n\t\t\"updatedAt\": \"2021-01-26 17:15:48\"\n\t}, ],\n\t\"msg\": \"新建子工项成功\",\n\t\"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/vwok_item.js",
    "groupTitle": "03-子工项",
    "name": "PostVwokItemCreate",
    "sampleRequest": [
      {
        "url": "http://localhost:3009/vwok/item/create"
      }
    ]
  },
  {
    "type": "post",
    "url": "/vwok/item/update",
    "title": "04-更新工项",
    "group": "03-子工项",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vwok_item_name",
            "description": "<p>工项名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vwok_item_id",
            "description": "<p>子工项id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vwok_id",
            "description": "<p>父工项id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "estimate_time",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scroll_estimate",
            "description": "<p>预计进度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scroll_actual",
            "description": "<p>实际进度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>备注</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求样例:",
          "content": "[\n    {\n        \"vwok_item_id\": \"13d14db0-5fb7-11eb-a0dc-fb06b46ac231 \",\n        \"vwok_id\": \"22bbda10-4587-11eb-89f0-d93442742f19 \",\n        \"uid\": \"f4fb6480-2bd0-11eb-95e3-f54fb34fd803 \",\n        \"vwok_item_name\": \"567  \",\n        \"start_time\": \"2021-01-26 \",\n        \"estimate_time\": null,\n        \"jira\": null,\n        \"progress\": null,\n        \"scroll_estimate\": 100,\n        \"scroll_actual\": null,\n        \"remark\": null,\n        \"createdAt\": \"2021-01-26 17:15:48\",\n        \"updatedAt\": \"2021-01-26 17:21:55\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.1.1",
    "success": {
      "examples": [
        {
          "title": "成功返回样例:",
          "content": " {\n    \"result\": [\n        {\n            \"vwok_item_id\": \"13d14db0-5fb7-11eb-a0dc-fb06b46ac231\",\n            \"vwok_id\": \"22bbda10-4587-11eb-89f0-d93442742f19\",\n            \"uid\": \"f4fb6480-2bd0-11eb-95e3-f54fb34fd803\",\n            \"vwok_item_name\": \"567  \",\n            \"start_time\": \"2021-01-26\",\n            \"estimate_time\": null,\n            \"jira\": null,\n            \"progress\": null,\n            \"scroll_estimate\": 100,\n            \"scroll_actual\": null,\n            \"remark\": null,\n            \"createdAt\": \"2021-01-26 17:15:48\",\n            \"updatedAt\": \"2021-01-26 17:47:22\",\n            \"vw_works\": {\n                \"vwok_name\": \"思明区_客户问撒旦苏打阿斯\"\n            }\n        },\n        \n    ],\n    \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/vwok_item.js",
    "groupTitle": "03-子工项",
    "name": "PostVwokItemUpdate",
    "sampleRequest": [
      {
        "url": "http://localhost:3009/vwok/item/update"
      }
    ]
  },
  {
    "type": "post",
    "url": "/vwok/item/update/today",
    "title": "05-更新当日工项",
    "group": "03-子工项",
    "description": "<p>与04相似,不再赘述.</p>",
    "version": "0.0.0",
    "filename": "routes/vwok_item.js",
    "groupTitle": "03-子工项",
    "name": "PostVwokItemUpdateToday",
    "sampleRequest": [
      {
        "url": "http://localhost:3009/vwok/item/update/today"
      }
    ]
  },
  {
    "type": "post",
    "url": "/vwok/item/update/today",
    "title": "06-获取今日工项",
    "group": "03-子工项",
    "description": "<p>与01相似,不再赘述.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scroll_estimate",
            "description": "<p><code>可选</code>   预计进度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scroll_actual",
            "description": "<p>实际进度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": "<p>备注</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/vwok_item.js",
    "groupTitle": "03-子工项",
    "name": "PostVwokItemUpdateToday",
    "sampleRequest": [
      {
        "url": "http://localhost:3009/vwok/item/update/today"
      }
    ]
  },
  {
    "type": "post",
    "url": "/user/forgot/reset/password",
    "title": "重置密码",
    "description": "<p>需要先获取邮箱验证码</p>",
    "name": "forgot-reset-password",
    "group": "用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>已注册的邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "verify",
            "description": "<p>邮箱验证码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"msg\": \"密码重置成功\",\n   \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3009/user/forgot/reset/password"
      }
    ],
    "version": "0.1.1",
    "filename": "routes/user.js",
    "groupTitle": "用户"
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "登录",
    "description": "<p>登录</p>",
    "name": "login",
    "group": "用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"msg\": \"登录成功\",\n   \"code\": 200,\n   \"token\": \"..PUNGdMxVQDJpLoT3.......\"\n   \"UserInfo\" : {用户信息}\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3009/user/login"
      }
    ],
    "version": "0.1.1",
    "filename": "routes/user.js",
    "groupTitle": "用户"
  },
  {
    "type": "post",
    "url": "/user/register",
    "title": "注册",
    "name": "register",
    "group": "用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>已注册的邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "verify",
            "description": "<p>邮箱验证码</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    -\"User_Info\": {\n    \"uid\": \"865050c0-055d-11eb-ab69-57a5f8dc98a0\",\n    \"username\": \"villiam\",\n    \"email\": \"1059448504@qq.com\",\n    \"password\": \"$2b$05$2CHrD6MxNcvdvY3w/7YtqOpnfBGHq1g7z2ffghtNml/fk.Gn7MR2e\",\n    \"updatedAt\": \"2020-10-03T09:48:00.846Z\",\n    \"createdAt\": \"2020-10-03T09:48:00.846Z\"\n    },\n    \"msg\": \"注册成功\",\n    \"code\": 200\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3009/user/register"
      }
    ],
    "version": "0.1.1",
    "filename": "routes/user.js",
    "groupTitle": "用户"
  },
  {
    "type": "post",
    "url": "/user/tokenlogin",
    "title": "token自动登录",
    "description": "<p>token自动登录</p>",
    "name": "tokenlogin",
    "group": "用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>token码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"msg\": \"登录成功\",\n   \"code\": 200,\n   \"token\": \"..PUNGdMxVQDJpLoT3.......\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3009/user/tokenlogin"
      }
    ],
    "version": "0.1.1",
    "filename": "routes/user.js",
    "groupTitle": "用户"
  },
  {
    "type": "post",
    "url": "/user/forgot/email",
    "title": "邮箱验证-重置密码",
    "name": "forgot-email",
    "group": "邮箱验证",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>已注册的邮箱</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"msg\": \"验证码发射成功\",\n   \"code\": 200\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3009/user/forgot/email"
      }
    ],
    "version": "0.1.1",
    "filename": "routes/user.js",
    "groupTitle": "邮箱验证"
  },
  {
    "type": "post",
    "url": "/user/register/email",
    "title": "邮箱验证-注册",
    "name": "register-email",
    "group": "邮箱验证",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>未注册的邮箱</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"msg\": \"验证码发射成功\",\n   \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3009/user/register/email"
      }
    ],
    "version": "0.1.1",
    "filename": "routes/user.js",
    "groupTitle": "邮箱验证"
  }
] });

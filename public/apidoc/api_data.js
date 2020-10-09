define({ "api": [
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
        "url": "http://localhost:3066/user/forgot/reset/password"
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
          "content": "{\n   \"msg\": \"登录成功\",\n   \"code\": 200,\n   \"token\": \"..PUNGdMxVQDJpLoT3.......\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3066/user/login"
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
        "url": "http://localhost:3066/user/register"
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
        "url": "http://localhost:3066/user/forgot/email"
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
        "url": "http://localhost:3066/user/register/email"
      }
    ],
    "version": "0.1.1",
    "filename": "routes/user.js",
    "groupTitle": "邮箱验证"
  }
] });
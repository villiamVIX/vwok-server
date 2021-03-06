"use strict";

module.exports = {
  port: 3009,
  session_cfg: {
    secret: "$#%$%$%",
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      SameSite: "none",
      Secure: true,
    },
  },
};

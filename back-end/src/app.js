const express = require("express");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, `config/.env.${process.env.NODE_ENV.trim()}`),
});

require("./db/mongoose");

const userRouter = require("./routers/user.router");
const adminRouter = require("./routers/admin.router");
const commonRouter = require("./routers/common.router");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(userRouter);
app.use(adminRouter);
app.use(commonRouter);

module.exports = app;

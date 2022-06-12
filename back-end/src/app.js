const express = require("express");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, `config/.env.${process.env.NODE_ENV.trim()}`),
});

require("./db/mongoose");

const userRouter = require("./routers/user.router");
const productRouter = require("./routers/product.router");
const adminRouter = require("./routers/admin.router");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(adminRouter);

module.exports = app;

const express = require("express");
const CheckAdmin = require("../middlewares/CheckAdminMiddleWare");
const CheckUser = require("../middlewares/CheckUserMiddleWare");
const CheckRole = require("../middlewares/CheckRole");

const Router = express.Router();

const AdminRouter = require("./admin");
Router.use("/admin", CheckUser, CheckAdmin, AdminRouter);

const AppRouter = require("./app");
Router.use("/app", AppRouter);

const UserRouter = require("./user");
Router.use("/user", CheckUser, CheckRole, UserRouter);

module.exports = Router;

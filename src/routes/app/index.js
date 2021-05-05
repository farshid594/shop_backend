const express = require("express");
const UserContoller = require("../../controllers/app/UserController");
const LoginValidate = require("../../validations/loginValidate");
const AppRouter = express.Router();

// login Routes
AppRouter.post("/signup", LoginValidate.SignUpValidate, UserContoller.SignUp);
AppRouter.post("/signin", UserContoller.Signin);
AppRouter.post("/signin-as-admin", UserContoller.SigninAsAdmin);

module.exports = AppRouter;

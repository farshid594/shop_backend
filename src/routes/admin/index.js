const express = require("express");
const UserController = require("../../controllers/admin/UserController");
const PermisionContoller = require("../../controllers/admin/PermisionContoller");
const RoleController = require("../../controllers/admin/RoleController");

const AdminRouter = express.Router();

AdminRouter.get("/", (req, res) => {
  res.json({ data: req.user });
});
//users
AdminRouter.get("/user-info", UserController.GetUserInfo);
AdminRouter.post("/users/logout", UserController.Logout);
AdminRouter.get("/users", UserController.GetAllUsers);
AdminRouter.delete("/users", UserController.DeleteUser);
AdminRouter.put("/users/toggle-admin", UserController.ToggleUserAdmin);
AdminRouter.put("/users/add-role", UserController.AddRoleToUser);

//permiosion
AdminRouter.get("/permision", PermisionContoller.GetAllPermisions);
AdminRouter.post("/permision", PermisionContoller.AddPermision);
AdminRouter.put("/permision", PermisionContoller.EditPermision);
AdminRouter.delete("/permision", PermisionContoller.DeletePermision);
//roles
AdminRouter.get("/role", RoleController.GetRoles);
AdminRouter.post("/role", RoleController.AddRole);
AdminRouter.delete("/role", RoleController.DeleteRole);

//category

module.exports = AdminRouter;

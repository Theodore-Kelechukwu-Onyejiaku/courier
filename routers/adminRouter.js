const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/userController");
const verification = require("../validation/validateToken");

adminRouter.get("/admin/register", adminController.registerAdmin);

adminRouter.get("/admin/login", adminController.get_signin);


module.exports = adminRouter;
const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");
const verification = require("../validation/validateToken");

adminRouter.get("/admin/register", adminController.registerAdmin);

adminRouter.get("/admin/login", adminController.get_signin);

adminRouter.get("/logout", adminController.logout)

adminRouter.post("/admin/login",  adminController.signin);

adminRouter.post("/admin/register", verification.verifyUser, verification.verifyAdmin, adminController.signup);


module.exports = adminRouter;
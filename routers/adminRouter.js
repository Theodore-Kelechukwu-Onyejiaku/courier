const express = require("express");
const adminRouter = express.Router();
//const adminController = require("../controllers/userController");
const verification = require("../validation/validateToken");

adminRouter.get("/api/")
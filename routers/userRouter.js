const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const verification = require("../validation/validateToken");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");


//Setting up images storage
let storage = multer.diskStorage({
    destination: "./public/uploads/images",
    filename: (req, file, cb)=>{
        cb(null, Date.now()+".png")
    },
})

let upload = multer({
    storage : storage,
    fileFilter: (req, file, cb)=>{
        checkFileType(file, cb);
    }
})

//Function to check file type
function checkFileType(file, cb){
    const fileTypes = /jpg|jpg|png|gif|jpeg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());

    if(extname){
        return cb(null, true);
    }else{
        cb("Error: Please images only.");
    }
}


userRouter.get("/",verification.verifyUser, verification.verifyAdmin, userController.getUsers);

userRouter.get("/dashboard", userController.dashboard);

userRouter.get("/add-user", userController.get_addCourier);

userRouter.post("/add-courier",upload.single("image"), userController.addCourier);



userRouter.get("/package-details", userController.packageDetail);

userRouter.post("/signup", userController.singup);

userRouter.get("/api/admin/register", userController.registerAdmin);

userRouter.get("/api/admin/login", userController.get_signin);

userRouter.post("/signin", userController.signin);

userRouter.get("/logout", userController.logout);

userRouter.get("/my_orders", verification.verifyUser, userController.getMyOrders);

module.exports = userRouter;
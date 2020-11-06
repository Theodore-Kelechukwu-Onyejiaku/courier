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

userRouter.get("/dashboard", verification.verifyUser, userController.dashboard);

userRouter.get("/add-user", verification.verifyUser, userController.get_addCourier);

userRouter.post("/add-courier",upload.single("image"),verification.verifyUser, userController.addCourier);

userRouter.post("/updatePackage/:id", verification.verifyUser, userController.updatePackage);

userRouter.get("/package-details/:id", verification.verifyUser, userController.packageDetail);
userRouter.get("/package/:id/delete", verification.verifyUser, userController.deletePackage)


userRouter.get("/track", userController.tracker)

userRouter.get("/logout", userController.logout);

module.exports = userRouter;
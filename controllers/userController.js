const User = require("../models/userModel");
const Courier = require("../models/courierModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validation = require("../validation/login_signupValidation");
const { render } = require("ejs");
const async = require("async")

//const Order = require("../models/orderModel");
//const Food = require("../models/foodModel")

require("dotenv").config();

exports.getUsers = (req, res, next)=>{
    User.find()
    .then(users =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users)
    }, err => next(err))
    .catch(err => next(err))
}


/**
 *      FOR /users/signup
 */




/**
 *      FOR /users/signin
*/




exports.dashboard =async (req, res, next)=>{
    async.parallel({
        ourUser : function(callback){
            User.findById(req.user._id).exec(callback)
        },
        ourPackage: function(callback){
            Courier.find({admin: req.user._id}).exec(callback)
        }
    },(err, result)=>{
        if(err){
            next(err)
        }else{
            res.render("dashboard", {user: result.ourUser, package: result.ourPackage})
        }
    })
    
}


exports.get_addCourier = (req, res, next)=>{
    try{
        User.findById(req.user._id, (err, user)=>{
            if(err){
                next(err);
                return;
            }
            res.render("addCourier", {user: user})
        })
    }
    catch(err){
        next(err)
    }
}

exports.packageDetail = (req, res, next)=>{
    async.parallel({
        ourUser : function(callback){
            User.findById(req.user._id).exec(callback)
        },
        ourPackage: function(callback){
            Courier.findById(req.params.id).exec(callback)
        }
    },(err, result)=>{
        if(err){
            next(err)
        }else{
            res.render("packageDetails", {user: result.ourUser, package: result.ourPackage})
        }
    })
}

exports.addCourier = async (req, res, next)=>{
    if(req.file){
        let file = req.file;

        //This removes the public from the file path, so we will have only "/uploads/users/*.jpg|png|gif"
        let Imgurl = file.path.replace("public", "");

        var courier = new Courier({
            admin : req.user._id,

            sender_fullname: req.body.sender_fullname,
            sender_email: req.body.sender_email,
            sender_phone: req.body.sender_phone,
            sender_address: req.body.sender_address,
            sender_country: req.body.sender_country,
            sender_state: req.body.sender_state,
            sender_zip_code: req.body.sender_zip_code,
            secret_question: req.body.secret_question,
        
            receiver_fullname: req.body.receiver_fullname,
            receiver_email: req.body.receiver_email,
            receiver_phone: req.body.receiver_phone,
            receiver_address: req.body.receiver_address,
            receiver_country: req.body.receiver_country,
            receiver_state: req.body.receiver_state,
            receiver_zip_code: req.body.receiver_zip_code,
            secret_answer: req.body.secret_answer,
        
            package_description: req.body.package_description,
            package_type: req.body.package_type,
            duration: req.body.duration,
            time_initiated: req.body.time_initiated,
            image: Imgurl
        })

        try{
            courier.save((err, user)=>{
                if(err){
                    next(err)
                }
                else{
                    res.redirect("dashboard")
                }
            })
        }

        catch(err){
            next(err)
        }
    }

    else{
        var courier = new Courier({
            admin : req.user._id,

            sender_fullname: req.body.sender_fullname,
            sender_email: req.body.sender_email,
            sender_phone: req.body.sender_phone,
            sender_address: req.body.sender_address,
            sender_country: req.body.sender_country,
            sender_state: req.body.sender_state,
            sender_zip_code: req.body.sender_zip_code,
            secret_question: req.body.secret_question,
        
            receiver_fullname: req.body.receiver_fullname,
            receiver_email: req.body.receiver_email,
            receiver_phone: req.body.receiver_phone,
            receiver_address: req.body.receiver_address,
            receiver_country: req.body.receiver_country,
            receiver_state: req.body.receiver_state,
            receiver_zip_code: req.body.receiver_zip_code,
            secret_answer: req.body.secret_answer,
        
            package_description: req.body.package_description,
            package_type: req.body.package_type,
            duration: req.body.duration,
            time_initiated: req.body.time_initiated
        })

        try{
            courier.save((err, user)=>{
                if(err){
                    next(err)
                }
                else{
                    res.redirect("dashboard")
                }
            })
        }

        catch(err){
            next(err)
        }
    }
    
}


exports.deletePackage = async (req, res, next)=>{
    try{
        Courier.findByIdAndRemove(req.params.id, (err, courier)=>{
            if(err){
                next(err)
                return
            }
            res.redirect("/dashboard")
        })
    }
    catch(error){
        next(error)
    }
}

exports.updatePackage = async (req, res, next)=>{
    try{
        Courier.findByIdAndUpdate({_id: req.params.id},req.body, {new: true}, (err, courier) =>{
            if(err){
                next(err)
                return;
            }else{
                res.redirect("/package-details/"+req.params.id);
            }
        })
    }
    catch(error){
        next(error)
    }
}


/**
 *      FOR /users/logout
 */
exports.logout = (req, res, next)=>{
    res.cookie('auth', "");
    res.render("signin", {message: "Logout Successful!!!"})
}


exports.tracker = async (req, res, next) =>{
    
    try{
        Courier.findById(req.query.id, (err, package)=>{
            if(err){
                var package = null;
                res.render("delivered", {err: err, package: package})
                return;
            }
            res.render("delivered", {package: package})
        })
    }
    catch(error){
        next(error)
    }
    
}
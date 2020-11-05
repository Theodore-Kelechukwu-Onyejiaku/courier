//const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validation = require("../validation/login_signupValidation");
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
exports.singup = async(req, res, next)=>{

    //if signup username and password fail validation
    const {error} = await validation.validate(req.body);
    if(error){
        var err = new Error(error.details[0].message);
        err.status = 404;
        return next(err);
    }

    User.findOne({username: req.body.username})
    .then(async user =>{
        //If user already exists in database
        if(user){
            var err = new Error("Username already exists!")
            err.status = 404;
            return next(err);
        }

        var salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        var newUser = new User({
            username: req.body.username,
            password: hashPassword
        })

        newUser.save()
        .then(customer =>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({"message":"signup successsful"})
        }, err  => next(err))
    }, err => next(err))
    .catch(err => next(err))
}



/**
 *      FOR /users/signin
*/

exports.get_signin = (req, res, next)=>{
    res.render("signin")
}

exports.registerAdmin = (req, res, next) =>{
    res.render("registerAdmin")
}
exports.dashboard = (req, res, next)=>{
    res.render("dashboard")
}


exports.get_addCourier = (req, res, next)=>{
    res.render("addCourier");
}

exports.packageDetail = (req, res, next)=>{
    res.render("packageDetails");
}

exports.addCourier = (req, res, next)=>{

}



exports.signin = async (req, res, next)=>{
    //if signup username and password fail validation
    const {error} = await validation.validate(req.body);
    if(error){
        var err = new Error(error.details[0].message);
        err.status = 404;
        return next(err);
    }

    User.findOne({username: req.body.username})
    .then(user =>{
        if(!user){
            var err = new Error("Username or password incorrect!");
            err.status = 404;
            return next(err);
        }

        var passwordCorrect = bcrypt.compare(req.body.password, user.password);
        //If passwords does not match
        if(!passwordCorrect){
            var err = new Error("Username or password incorrect!");
            err.status = 404;
            return next(err);
        }

        //Create and assign Token
        var token = jwt.sign( user.toJSON(), process.env.TOKEN_SECRET,{ expiresIn: '59m' });
        
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        
        res.json({token, message:"logged in"})
    })
}

/**
 *      FOR /users/logout
 */
exports.logout = (req, res, next)=>{
    var authHeader = req.headers.authorization;
    if(!authHeader){
        res.statusCode = 403;
        var err = new Error("You are not logged in!");
        return next(err)
    }
    req.headers.authorization.split(" ")[1] = ""
    res.statusCode = 200;
    res.setHeader("Cotent-Type", "application/json");
    res.json({"message": "Logout successful!"})
}


/**
 *      FOR /foods/my_orders
 */
exports.getMyOrders = (req, res, next)=>{
    Order.find({"user": req.user._id})
    .populate("food")
    .then(order =>{
            res.statusCode = 200;
            res.setHeader("Conten-Type", "application/json");
            res.json({order})
    }, err => next(err))
    .catch(err => next(err))
}

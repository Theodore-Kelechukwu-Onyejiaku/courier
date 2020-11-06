const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validation = require("../validation/login_signupValidation");
const { render } = require("ejs");
//const Order = require("../models/orderModel");
//const Food = require("../models/foodModel")

require("dotenv").config();

exports.registerAdmin = (req, res, next) =>{
    res.render("registerAdmin")
}


exports.get_signin = (req, res, next)=>{
    res.render("signin")
}

exports.logout = (req, res, next) =>{
    res.cookie('auth', "");
    res.render("user/signin", {message: "Logout Successful!!!"})
}

exports.signin = async (req, res, next)=>{
    User.findOne({email: req.body.email})
    .then(user =>{
        if(!user){
            var err = new Error("Username or password incorrect!");
            err.status = 404;
            res.render("signin", {error: err})
            return;
        }

        var passwordCorrect = bcrypt.compare(req.body.password, user.password);
        //If passwords does not match
        if(!passwordCorrect){
            var err = new Error("Username or password incorrect!");
            err.status = 404;
            res.render("signin", {error: err})
            return
        }
        
        res.statusCode = 200;
        const token = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET, {  expiresIn: '59m' });
            res.cookie('auth', token);
            res.redirect("/dashboard")
    })
}


exports.signup = async(req, res, next)=>{

    console.log("started!");
    //if signup username and password fail validation
    const {error} = await validation.validateRegistration(req.body);

    if(error){
        var err = new Error(error.details[0].message);
        err.status = 404;
        res.render("registerAdmin", {error: err});
        return;
    }

    User.findOne({email: req.body.email})
    .then(async user =>{
        //If user already exists in database
        if(user){
            var err = new Error("Username already exists!")
            err.status = 404;
            res.render("registerAdmin", {error: err});
            return;
        }

        var salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        var newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: hashPassword,
            realPassword: req.body.password
        })

        newUser.save()
        .then(user=>{
            res.statusCode = 200;
            res.render("signin", {message: "Registration Successful!"});
        }, err  => next(err))
    }, err => next(err))
    .catch(err => {
        res.render("registerAdmin", {error: err});
    })
}

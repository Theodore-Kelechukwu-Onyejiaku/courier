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
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyUser = (req, res, next)=>{
    var token = req.cookies.auth;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, token_data)=>{
            if(err){
                err = "You are not authenticated. Please log in!"
                err.status = 403;
                res.render("signin", {error: err})
                return;
            }else{
                req.user = token_data
                next();
            }
        })
    }else{
        var err = new Error("Please login in!!!");
        err.status = 403;
        res.render("signin", {error: err})
        return;
    }
    
}

exports.verifyAdmin = (req, res, next)=>{
    if(req.user.admin){
      return  next()
    }
    var err = new Error("You are not authorized!");
    err.status = 403;
    res.render("signin", {error: err});
}
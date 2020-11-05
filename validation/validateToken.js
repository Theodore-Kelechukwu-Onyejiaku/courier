const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyUser = (req, res, next)=>{
    var authHeader = req.headers.authorization;
    if(!authHeader){
        var err = new Error("You are not authenticated");
        err.status = 403;
        next(err);
    }

    //The Bearer and token
    var bearer = authHeader.split(" ")[0];
    var token = authHeader.split(" ")[1];

    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, token_data)=>{
            if(err){
                err = "You are not authenticated"
                err.status = 403;
                return next(err)
            }else{
                req.user = token_data
                next();
            }
        })
    }else{
        var err = new Error("You are not authenticated");
        err.status = 403;
        next(err);
    }
    
}

exports.verifyAdmin = (req, res, next)=>{
    if(req.user.admin){
      return  next()
    }
    var err = new Error("You are not authorized!");
        err.status = 403;
        next(err);
}
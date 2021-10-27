const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');


exports.protect = async (req, res, next) => {
// exports.protect = async (req, res) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    };
    if(!token){
        return next(new ErrorResponse("not authorized to access this route", 401));
        // res.status(401).json({success: false, error: "not authorized to access this route"});
    };
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return next(new ErrorResponse("no user found with this id", 404));
            // res.status(404).json({success: false, error: "no user found with this id"});
   
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorResponse("not authorized to access this route", 401));
        // res.status(401).json({success: false, error: "not authorized to access this route"});
    
    }


}
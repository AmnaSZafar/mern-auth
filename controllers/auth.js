
const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
// exports.register = async (req, res) => {
    // res.send("Register Route");
    const {username, email, password } = req.body;
    try {
        const user = await User.create({
            username, 
            email, 
            password
        });
        // res.status(201).json({
        //     success: true,
        //     user,
        // });
        sendToken(user, 200,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            
        });
        next(error);
    }
};
exports.login = async (req, res, next) => {
// exports.login = async (req, res) => {
    // res.send("Login Route");
    const { email, password } = req.body;
    if(!email || !password){
        return next(new ErrorResponse("please provide email and password", 400));
        // res.status(400).json({success: false, error: "please provide email and password"});
    }
    try {
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorResponse("Invalid credentials", 401));
        
            // res.status(404).json({success: false, error: "Invalid credentials"})
        }
        const isMatch = await user.matchPasswords(password);
        if(!isMatch){
            return next(new ErrorResponse("Invalid credentials", 401));
            // res.status(404).json({success: false, error: "Invalid credentials"})
        };
        // res.status(200).json({
        //     success: true,
        //     token: "29874wjejf",
        // });
        sendToken(user, 200,res);

    } catch (error) {
        res.status(500).json({success: false, error:error.message});
    }
};
exports.forgotpassword = async (req, res, next) => {
// exports.forgotpassword = (req, res) => {
    // res.send("Forgot Password Route");
    const {email} =  req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("email could not be sent", 404));
        }
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
        const message = `
        <h1>You have requested a password reset</h1>
        <p>please to go this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;


        try {
            await sendEmail({
                to:user.email,
                subject:"password reset request",
                text: message
            });
            res.status(200).json({
                success: true,
                data: "Email sent"
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse("Email couldn't be sent", 500));
        }

    } catch (error) {
        next(error);
    }
};
exports.resetpassword = async (req, res, next) => {
// exports.resetpassword = (req, res) => {
    // res.send("Reset Password Route");
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() } 
        });
        if(!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400));
        };
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(201).json({
            success: true,
            data: "password reset success"
        });
    } catch (error) {
        next(error);
    }
};

 
const sendToken = (user, StatusCode, res) => {
    const token = user.getSignedToken();
    res.status(StatusCode).json({
        success: true,
        token
    });
}


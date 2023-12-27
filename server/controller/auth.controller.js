const User = require("../models/user.model");
const asyncErrorHandler = require("../middleware/asyncErrorHandling");
const generateToken = require("../config/generateToken");
const cookies = require("cookie");

const signUpUser = asyncErrorHandler(async(req,res)=>{
    const {email} = req.body.email;
    const findUser = await User.findOne({email});
    if(!findUser){
        const user = await User.create(req.body);
        res.status(201)
           .json({
             status:"Success",
             message:"User signedUp successfully",
             user
        });
    }else{
        throw new Error("User already exist");
    }
});
const logInUser = asyncErrorHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new Error("Please enter the email and password");
    }
    const findUser = await User.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(password))){
        const token = generateToken(findUser._id);
        res.status(200)
           .cookie("token",token,{ httpOnly:true})
           .json({
            status:"logIn Success",
            message:"User logIn successfully",
            findUser
       });
    }
})

module.exports={signUpUser,logInUser};
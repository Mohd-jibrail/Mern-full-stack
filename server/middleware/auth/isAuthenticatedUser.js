const asyncHandler = require("../asyncErrorHandling");
const jsonWebToken = require("jsonwebtoken");
const User = require("../../models/user.model");
const isAuthenticatedUser= asyncHandler(async(req,res,next)=>{
    const tokenObj= req.cookies;
    if(!tokenObj){
        throw new Error("User Not logIn");
    }
    const decode = jsonWebToken.verify(tokenObj.token,"ali@zahra");
    req.user = await User.findById(decode._id);
    next();
});
module.exports=isAuthenticatedUser;

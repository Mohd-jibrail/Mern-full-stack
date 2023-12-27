const jwt = require("jsonwebtoken");
const generateToken=(_id)=>{
    return jwt.sign({_id},"ali@zahra",{expiresIn:"1d"});
}
module.exports=generateToken;
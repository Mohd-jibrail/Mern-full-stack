const express = require("express");
const {signUpUser,logInUser} = require("../controller/auth.controller");
const router = express.Router();

router.route("/signup").post(signUpUser);
router.route("/login").post(logInUser);


module.exports=router;
const express = require("express");
const {signUpUser,logInUser, getAllUsers,logOut} = require("../controller/auth.controller");
const isAuthenticatedUser = require("../middleware/isAuthenticatedUser");
const isAuthenticatedAdmin = require("../middleware/isAuthenticatedAdmin");
const router = express.Router();

router.route("/signup").post(signUpUser);
router.route("/login").post(logInUser);
router.route("/logout").get(logOut);
router.route("/getAllUser").get(isAuthenticatedUser,isAuthenticatedAdmin,getAllUsers);


module.exports=router;
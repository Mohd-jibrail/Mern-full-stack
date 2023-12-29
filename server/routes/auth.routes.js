const express = require("express");
const {signUpUser,logInUser, getAllUsers,logOut, getAUser, getAllActiveUsers, addToCart,
       removeFromCart, emptyCart} = require("../controller/auth.controller");
const isAuthenticatedUser = require("../middleware/auth/isAuthenticatedUser");
const isAuthenticatedAdmin = require("../middleware/auth/isAuthenticatedAdmin");
const router = express.Router();

/*All the User auth routes*/
router.route("/signup").post(signUpUser);
router.route("/login").post(logInUser);
router.route("/logout").get(isAuthenticatedUser,logOut);
router.route("/getAllUser").get(isAuthenticatedUser,isAuthenticatedAdmin,getAllUsers);
router.route("/getAllActiveUser").get(isAuthenticatedUser,isAuthenticatedAdmin,getAllActiveUsers);
router.route("/getUser/:id").get(isAuthenticatedUser,isAuthenticatedAdmin,getAUser);

/*All the cart routes*/
router.route("/AddToCart/:id").post(isAuthenticatedUser,addToCart);
router.route("/removeFromCart/:id").put(isAuthenticatedUser,removeFromCart);
router.route("/emptyCart").put(isAuthenticatedUser,emptyCart);

module.exports=router;
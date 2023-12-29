const express = require("express");
const isAuthenticatedUser = require("../middleware/auth/isAuthenticatedUser");
const router = express();

router.route("/order").post(isAuthenticatedUser,);
module.exports=router;
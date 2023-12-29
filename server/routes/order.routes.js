const express = require("express");
const isAuthenticatedUser = require("../middleware/auth/isAuthenticatedUser");
const isAddressMatched = require("../middleware/orderMidware/addressHandleing")
const {addToOrder, cancelOrder} = require("../controller/order.controller");
const isCancelTimeAvailable = require("../middleware/orderMidware/cancelTimeHandling");
const router = express();

router.route("/addToOrder/:productId").post(isAuthenticatedUser,isAddressMatched,addToOrder);
router.route("/cancelOrder/:productId").delete(isAuthenticatedUser,isCancelTimeAvailable,cancelOrder)
module.exports=router;
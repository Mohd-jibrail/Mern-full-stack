const asyncErrorHandler = require("../errHandlers/asyncErrorHandling");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");
const isCancelTimeAvailable = asyncErrorHandler(async(req,res,next)=>{
   const productId = req.params.productId;
   const userId = req.user._id;
   const findOrder = await Order.findOne({productId:productId,userId:userId});
   const orderDateAndTime = findOrder.orderDateAndTime;
   const currentDateAndTime = new Date();
   const cancelOrderTime= (currentDateAndTime - orderDateAndTime)/3600000;
   if(cancelOrderTime>8){
    throw new Error("We can not cancel order")
   }
   next();
});
module.exports= isCancelTimeAvailable;
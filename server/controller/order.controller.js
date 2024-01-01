const asyncErrorHandler = require("../middleware/errHandlers/asyncErrorHandling");
const Order = require("../models/order.model");
const addToOrder = asyncErrorHandler(async(req,res)=>{
    const newOrder={
        userId:req.user._id,
        productId:req.product._id,
        price:req.product.price,
        address:req.user.address
    };
    const createOrder = await Order.create(newOrder);
    res.status(201).json({
        status:"Success",
        message:"Order Placed",
        createOrder
    })
});
const cancelOrder = asyncErrorHandler(async(req,res)=>{
   const userId = req.user._id;
   const productId = req.params.productId;
   const deleteOrder = await Order.findOneAndDelete({userId,productId});
   res.status(200).json({
    status:"Success",
    message:"Order cancel successfully",
    deleteOrder
   });
});
module.exports={addToOrder, cancelOrder}
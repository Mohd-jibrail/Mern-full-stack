const asyncErrorHandler = require("../middleware/errHandlers/asyncErrorHandling");
const Order = require("../models/order.model");
const addToOrder = asyncErrorHandler(async(req,res)=>{

    const order={
        userId:req.user._id,
        productId:req.product._id,
        amount:req.product.price,
        deleveryAddress:req.user.address
    };
    const createOrder = await Order.create(order);
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
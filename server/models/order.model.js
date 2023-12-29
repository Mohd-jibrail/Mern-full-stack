const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId, ref:"User"},
    ProductId:{type:mongoose.Schema.ObjectId, ref:"Product"},
    amount:Number,
    deleveryAddress:Object,
    orderDateAndTime:Date.now
});
const Order = mongoose.model("Order",orderSchema);
module.exports=Order;
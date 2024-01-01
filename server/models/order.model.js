const mongoose = require("mongoose");
const Delevery = require("../models/delevery.model");

/*Order collection mongoose schema*/
const orderSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId, ref:"User"},
    productId:{type:mongoose.Schema.ObjectId, ref:"Product"},
    price:{type:Number,require:true},
    orderStatus:{type:String, default:"Not-Started"},
    address:{type:Object,require:true},
    orderDateAndTime:{ type:Date,default: Date.now}
});
const Order = mongoose.model("Order",orderSchema);
module.exports=Order;
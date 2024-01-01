const mongoose = require("mongoose");
const deleverySchema = mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,require:true},
    productId:{type:mongoose.Schema.ObjectId, require:true},
    price:{type:Number, require:true},
    itemCount:{type:Number, default:"1"},
    modeOfPayment:{type:String, default:"Pre-Paid"},
    address:{type:Object,require:true},
    status:{type:String, default:"Picked"},

});
const Delevery = mongoose.model("Delevery", deleverySchema);
module.exports= Delevery;
const mongoose = require("mongoose");

const productSchema  = mongoose.Schema({
    title:{type:String, require:true},
    description:{type:String, require:true},
    price:{type:Number, require:true},
    stock:{type:Number, require:true},
    isAvailable:{type:Boolean, default:"true"},
    reviews:[{
        comments:{type:String, require:true},
        rating:{type:Number, require:true},
        user:{ type:mongoose.Schema.ObjectId, ref:"User"},
        image:[{
            public_id:{type:String, default:"google.com"},
            url:{type:String, default:"google.com"}
        }],
        createdAt:{ type:Date, default: Date.now},
    }],
    Image:[{
        public_id:{type:String, default:"google.com"},
        url:{type:String, default:"google.com"}
    }],
    tags:{ type:Array, require:true},
    zipcode:{type:Number, require:true},
    createdAt:{ type:Date, default: Date.now},
    sellerId:{type:mongoose.Schema.ObjectId, ref:"User"}
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

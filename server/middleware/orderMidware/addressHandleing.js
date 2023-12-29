const Product = require("../../models/product.model");
const asyncErrorHandler = require("../errHandlers/asyncErrorHandling");

const isAddressMatched= asyncErrorHandler(async(req,res,next)=>{
    const userAddress = req.user.address;
    if(userAddress.zipcode.length==0){
        throw new Error("Please Add the address");
    }
    const productId = req.params.productId;
    const findProduct = await Product.findById({_id:productId});
    if(userAddress.zipcode!=findProduct.zipcode){
        throw new Error("Product not available for this Zipcode")
    }
    req.product=findProduct;
    next();
});
module.exports=isAddressMatched;
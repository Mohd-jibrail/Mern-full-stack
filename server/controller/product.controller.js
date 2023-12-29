const Product = require("../models/product.model");
const asyncErrorHandler = require("../middleware/errHandlers/asyncErrorHandling");
const { json } = require("body-parser");

/* Product adding*/
const addProduct =asyncErrorHandler(async(req,res)=>{
    const product = await Product.create(req.body);
    res.status(200).json({
        status:"Success",
        message:"Product added",
        product:{
            title: product?.title,
            description:product?.description,
            price:product?.price,
            stock:product?.stock
        }
    });
});
/*Get All the Products*/
const getAllProducts = asyncErrorHandler(async(req,res)=>{
    const products = await Product.find().select({title:1,description:1,price:1,stock:1});
    if(products){
        res.json({
            status:"Success",
            message:"Product added",
            products
        });
    }
});
/*Ge a single product by ID*/
const getAProduct = asyncErrorHandler(async(req,res)=>{
    const _id = req.params.id;
    const product = await Product.findById({_id});
    res.json({
        status:"Success",
        message:"Product added",
        product
    })
});
/*Update a single product by Id */
const updateProduct = asyncErrorHandler(async(req,res)=>{
    const _id=req.params.id;
    const product = await Product.findByIdAndUpdate({_id},{
        title:req?.body?.title,
        description:req?.body?.description,
        price:req?.body?.price,
        stock:req?.body?.stock,
    },{ 
        new:true,
        runValidators:true,
        useFindAndModify:false})
    .select({title:1,description:1,price:1,stock:1});
    res.status(200).json({
        status:"Success",
        message:"Product Updated",
        product
    })
});
/*Delete A product by Id */
const deleteProduct = asyncErrorHandler(async(req,res)=>{
    const _id = req.params.id;
    const delProduct = await Product.findByIdAndDelete({_id});
    res.status(200).json({
        status:"Success",
        message:"Delected Product",
        delProduct 
    })
});
/* Implementation of Adding reviews to a product by a user*/
const addReview = asyncErrorHandler(async(req,res)=>{
    const _id = req.params.product_id;
    const review={
        comments:req.body.comments,
        rating:req.body.rating,
        user:req.user._id,

    }
    const product = await Product.findById({_id});
    if(product){
       product.reviews.push(review);
       product.save();
    }else{
       throw new Error("Product not found");  
    }
    res.status(200).json({
        status:"Success",
        message:"Review Added",
        product
    })

});
const getAllReviews = asyncErrorHandler(async(req,res)=>{
    const _id = req.params.product_id;
    const reviews = await Product.findById({_id}).select({"reviews.comments":1,"reviews.rating":1});
    res.status(200).json({
        status:"Success",
        message:"All the Reviews",
        reviews
    });

});
const getAUserReview = asyncErrorHandler(async(req,res)=>{
    const _id = req.user._id;
    const review = await Product.find({"reviews.user":_id},'reviews.$');
    if(!review){
        throw new Error("No Reviews found");
    }
    res.status(200).json({
        status:"Success",
        message:"Got Review",
        review
    });
});
const getAReview = asyncErrorHandler(async(req,res)=>{
    
    const _id = req.params.review_id;
    const review = await Product.find({"reviews._id":_id},'reviews.$');
    if(!review){
        throw new Error("No Reviews found");
    }
    res.status(200).json({
        status:"Success",
        message:"Got Review",
        review
    });
});
const deleteReview = asyncErrorHandler(async(req,res)=>{
    const review_id = req.params.id;
    const review = await Product.findOneAndUpdate({"reviews._id":review_id},{
        $pull:{
            reviews:{_id:review_id}
        }
    },{new:true});
    res.status(200).json({
        status:"Success",
        message:"Review Deleted",
        review
    });
   
})
const updateReview = asyncErrorHandler(async(req,res)=>{
    const review_id = req.params.id;
    const review = await Product.findOneAndUpdate({"reviews._id":review_id},'reviews.$',{
        $set:{
            "reviews.$.comments":req?.body?.comments,
            "reviews.$.rating": req?.body?.rating
        }
    },{new:true}).select("reviews.$")
    res.status(200).json({
        status:"Success",
        message:"Review Updated",
        review
    });
})
module.exports={addProduct,getAllProducts,getAProduct,updateProduct,deleteProduct,
                addReview,getAllReviews,getAUserReview,getAReview,deleteReview,updateReview}
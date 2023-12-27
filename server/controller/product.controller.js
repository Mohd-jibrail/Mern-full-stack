const Product = require("../models/product.model");
const asyncErrorHandler = require("../middleware/asyncErrorHandling");
const { json } = require("body-parser");

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
const getAProduct = asyncErrorHandler(async(req,res)=>{
    const _id = req.params.id;
    const product = await Product.findById({_id});
    res.json({
        status:"Success",
        message:"Product added",
        product
    })
});
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
const deleteProduct = asyncErrorHandler(async(req,res)=>{
    const _id = req.params.id;
    const delProduct = await Product.findByIdAndDelete({_id});
    res.status(200).json({
        status:"Success",
        message:"Delected Product",
        delProduct 
    })
});

module.exports={addProduct,getAllProducts,getAProduct,updateProduct,deleteProduct}
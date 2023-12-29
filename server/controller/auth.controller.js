const User = require("../models/user.model");
const Product = require("../models/product.model")
const asyncErrorHandler = require("../middleware/asyncErrorHandling");
const generateToken = require("../config/generateToken");
const cookies = require("cookie");

/*The Sign-Up controller for User*/
const signUpUser = asyncErrorHandler(async(req,res)=>{
    const {email} = req.body.email;
    const findUser = await User.findOne({email});
    if(!findUser){
        const user = await User.create(req.body);
        res.status(201)
           .json({
             status:"Success",
             message:"User signedUp successfully",
             user
        });
    }else{
        throw new Error("User already exist");
    }
});

/*The Log-In controller for User*/
const logInUser = asyncErrorHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new Error("Please enter the email and password");
    }
    const findUser = await User.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(password))){
        const token = generateToken(findUser._id);
        res.status(200)
           .cookie("token",token,{ httpOnly:true})
           .json({
            status:"logIn Success",
            message:"User logIn successfully",
            findUser
       });
    }
});

/*The Log-Out controller for User*/
const logOut= asyncErrorHandler(async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        status:"Success",
        message:"User log-out"
    });
});

/*Get All Users*/
const getAllUsers=asyncErrorHandler(async(req,res)=>{
    const allUser = await User.find();
       if(allUser){
            res.status(200).json({
                status:"success",
                message:"Got all the users",
                allUser
            });
       }else{
        throw new Error("No user found");
       }
});
const getAUser = asyncErrorHandler(async(req,res)=>{
    const _id = req.params.id;
    const findUser = await User.findById({_id},{password:0});
    if(!findUser){
        throw new Error("User does not exist");
    }
    res.status(200).json({
        status:"Success",
        message:"User found",
        findUser
    })
});
const getAllActiveUsers = asyncErrorHandler(async(req,res)=>{
    const allActiveUsers = await User.find({isActive:true},{password:0});
    if(!allActiveUsers){
       throw new Error("No Active User")
    }
    res.status(200).json({
        status:"Success",
        massage:"All the active users",
        allActiveUsers
    })
});
const addToCart = asyncErrorHandler(async(req,res)=>{
    const product_id =req.params.id;
    const findProduct = await Product.findById({_id:product_id});
    const cart={
        product:findProduct._id,
        title:findProduct.title,
        price:findProduct.price
    };
    const findUser = await User.findById({_id:req.user._id});

    const isProductIdPresent= findUser.cart.some(cartItem=>cartItem.product==product_id);
    if(isProductIdPresent){
        throw new Error("Prodcut already added");
    }
    if(findUser){
        findUser.cart.push(cart);
        findUser.save();
    }
    res.status(200).json({
        status:"Success",
        message:"Product added to cart",
        findUser
    });
});
const removeFromCart = asyncErrorHandler(async(req,res)=>{
    const productId = req.params.id;
    const cartObj = req.user.cart;
    const isProductIdPresent = cartObj.some(cartItem=>cartItem.product==productId);
    if(!isProductIdPresent){
        throw new Error("Cart don't have product")
    }
    const findUser = await User.findOneAndUpdate({"cart.product":productId},{
        $pull:{
            cart:{product:productId}
        }
    },{new:true});
    res.status(200).json({
        status:"Success",
        message:"Product removed from cart",
        findUser
    })
});
const emptyCart = asyncErrorHandler(async(req,res)=>{
   const userId = req.user._id;
   const cartObj = req.user.cart;
   if(cartObj.length==0){
     throw new Error("Cart is already empty");
   }
   const emptyCart = []
   const findUser = await User.updateOne({_id:userId},{
    $set:{ cart:emptyCart}
   });
   res.status(200).json({
    status:"Success",
    message:"Cart is empty",
    findUser
   })
});
module.exports={signUpUser,logInUser,logOut,getAllUsers,getAUser,getAllActiveUsers,
                addToCart,removeFromCart,emptyCart};
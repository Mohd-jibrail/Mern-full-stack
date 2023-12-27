const express = require("express");
const {addProduct,getAllProducts,getAProduct,updateProduct,deleteProduct,
       addReview, getAllReviews, getAReview, deleteReview, updateReview} = require("../controller/product.controller");
const isAuthenticatedUser = require("../middleware/isAuthenticatedUser");
const isAuthenticatedAdmin = require("../middleware/isAuthenticatedAdmin");
const router = express();

router.post("/addProduct",isAuthenticatedUser,isAuthenticatedAdmin,addProduct)
      .post("/addReview/:id",isAuthenticatedUser,addReview);
router.get("/allProducts",isAuthenticatedUser,getAllProducts)
      .get("/getProduct/:id",isAuthenticatedUser,getAProduct)
      .get("/allReviews/:id",isAuthenticatedUser,getAllReviews)
      .get("/getAReview",isAuthenticatedUser,getAReview);
router.put("/updateProduct/:id",isAuthenticatedUser,isAuthenticatedAdmin,updateProduct)
      .put("/updateReview/:id",isAuthenticatedUser,updateReview);
router.delete("/deleteProduct/:id",isAuthenticatedUser,isAuthenticatedAdmin,deleteProduct)
      .delete("/deleteReview/:id",isAuthenticatedUser,deleteReview);

module.exports=router;
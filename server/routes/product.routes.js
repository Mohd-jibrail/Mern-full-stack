const express = require("express");
const {addProduct,getAllProducts,getAProduct,updateProduct,deleteProduct,
       addReview, getAllReviews, getAUserReview,getAReview, deleteReview, updateReview} = require("../controller/product.controller");
const isAuthenticatedUser = require("../middleware/auth/isAuthenticatedUser");
const isAuthenticatedAdmin = require("../middleware/auth/isAuthenticatedAdmin");
const router = express();

/*All the routes for the products*/
router.post("/addProduct",isAuthenticatedUser,isAuthenticatedAdmin,addProduct);
router.get("/allProducts",isAuthenticatedUser,getAllProducts)
      .get("/getProduct/:id",isAuthenticatedUser,getAProduct);
router.put("/updateProduct/:id",isAuthenticatedUser,isAuthenticatedAdmin,updateProduct)
router.delete("/deleteProduct/:id",isAuthenticatedUser,isAuthenticatedAdmin,deleteProduct);

/*All the routes for the reviews*/
router.post("/addReview/:product_id",isAuthenticatedUser,addReview);
router.get("/getAUserReview",isAuthenticatedUser,getAUserReview)
      .get("/getAReview/:review_id",isAuthenticatedUser,getAReview)
      .get("/allReviews/:product_id",isAuthenticatedUser,getAllReviews)
router.put("/updateReview/:id",isAuthenticatedUser,updateReview);
router.delete("/deleteReview/:review_id",isAuthenticatedUser,deleteReview);


module.exports=router;
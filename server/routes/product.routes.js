const express = require("express");
const {addProduct,getAllProducts,getAProduct,updateProduct,deleteProduct} = require("../controller/product.controller");
const router = express();

router.post("/addProduct",addProduct);
router.get("/AllProducts",getAllProducts)
      .get("/getProduct/:id",getAProduct);
router.put("/updateProduct/:id",updateProduct);
router.delete("/deleteProduct/:id",deleteProduct);

module.exports=router;
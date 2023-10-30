const express=require("express");
const { getAllproducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const router=express.Router();
const {IsAuthenticateduser,authorizeRoles}=require("../middleware/auth");
//make all routes
router.route("/products").get(getAllproducts);

router.route("/admin/products/new")
      .post(IsAuthenticateduser,authorizeRoles("admin"),createProduct);

router.route("/admin/product/:id")
      .put(IsAuthenticateduser,authorizeRoles("admin"),updateProduct)
      .delete(IsAuthenticateduser,authorizeRoles("admin"),deleteProduct)
      
router.route("/product/:id")
      .get(getProductDetails);      





//export router
module.exports=router

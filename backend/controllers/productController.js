const Product=require("../models/productSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError")
const Apifeatures=require("../utils/apifeatures")
//Create a product --ADMIN access
//make a function createproduct
exports.createProduct=catchAsyncError(async(req,res,next)=>{

req.body.user=req.user.id;

  const product=await Product.create(req.body)
//201 status of product creation
  res.json(201).json({
    success:true,
    product
  });
});


//Update product    --ADMIN ACCESSS
exports.updateProduct=catchAsyncError(async(req,res,next)=>{

    //find the product 
    let product= await Product.findById(req.params.id);

    //if product not found
    if(!product){
        //500 error code
        return next(new ErrorHandler("Product Not found",404));
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,
        useFindAndModify:false
    });
    
    //ststaus code for success
    res.status(500).json({
        success:true,
        product

    });
});

//Delete product  --ADMIN access
exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    //find the product by id
    let product=await Product.findById(req.params.id);
    //if product not found
    if(!product){
        //500 error code
        return next(new ErrorHandler("Product Not found",404));
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Item deleted"
    });
});

//GET single product
exports.getProductDetails=catchAsyncError(async(req,res)=>{
    //find prodcut by id
    let product=await Product.findById(req.params.id);
    //if product not found
    if(!product){
        //500 error code
        return next(new ErrorHandler("Product Not found",404));
    }
    res.status(200).json({
        success:true,
        product
    });
});

//GET all products
exports.getAllproducts=catchAsyncError(async(req,res)=>{
    const resultPerpage=5;
    const productCount=await Product.countDocuments();
                //query         //queryStr    //keyword matlab kya dhudna hai usko
    const apifeature= new Apifeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerpage);
    const products=await apifeature.query;
    res.status(200).json({
        success:true,
        products,
        productCount
    });
});

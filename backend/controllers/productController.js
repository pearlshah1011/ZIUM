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

//create new review or update review
exports.createProductReview=catchAsyncError(async(req,res,next)=>{

    const{rating,comment,productId}=req.body;
  //create an object review
   const review ={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
   }
   //find product
   const product= await Product.findById(productId);

   const isReviewed= product.reviews.find(
    review=>review.user.toString()===req.user.toString()
   )
   

   //if already review exist 
  if(isReviewed){
  product.reviews.forEach(review=>{
    if(review=>review.user.toString()===req.user.toString()){
        review.rating=rating,
        review.comment=comment
    }
   
  })
  }
  else{
    product.reviews.push(review);
    product.NumberofReviews=product.reviews.length
  }
let avg=0;
  product.ratings=product.reviews.forEach(review=>{
    avg=avg+review.rating
  }) /product.reviews.length;

  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success:true
  })

})

//get all reviews
exports.getProductReviews=catchAsyncError(async(req,res,next)=>{

  //find the product
  const product=await Product.findById(req.query.id);
  if(!product){
    //404 error code
    return next(new ErrorHandler("Product Not found",404));
   };

   res.status(200).json({
    success:true,
    reviews:product.reviews
  });

});

//delete review
exports.deleteReview=catchAsyncError(async(req,res,next)=>{

   //find the product
   const product=await Product.findById(req.query.productId);
   if(!product){
     //404 error code
     return next(new ErrorHandler("Product Not found",404));
    };

    //npw we store all reviews that arent to be deleted(filter() method creates a
    // new array filled with elements that pass a test provided by a function.)
   const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString());
   
   let avg=0;
 const ratings=reviews.forEach(review=>{
    avg=avg+review.rating
  }) /reviews.length;

  const numOfReviews=reviews.length;
  
  await product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })


 
    res.status(200).json({
     success:true,
   
   });
 
})

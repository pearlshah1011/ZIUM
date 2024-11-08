const Order=require("../models/orderModel");
const Product=require("../models/productSchema");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError")
const Apifeatures=require("../utils/apifeatures");

//create new order
exports.newOrder=catchAsyncError(async(req,res,next)=>{
  
    const{shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;
   
    const order=await Order.create({
        shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paidAt:Date.now()
        ,user:req.user._id
    });

    res.status(201).json({
        success:true,
        order,
    });
});

//get single order details--admin
exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{

    const order=await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    res.status(200).json({
    success:true,
    order})
}
);

//get all orders for a logged in user

exports.myOrders=catchAsyncError(async(req,res,next)=>{
  //we apply filter on order
    const orders=await Order.find({user:req.user._id});

    res.status(200).json({
    success:true,
    orders})
}
);

//get all orders -- admin
exports.getAllOrders=catchAsyncError(async(req,res,next)=>{
    //we apply filter on order
      const orders=await Order.find();

      let totalAmount=0;
      orders.forEach((order)=>{
        totalAmount=totalAmount+order.totalPrice;
      })
  
      res.status(200).json({
      success:true,
      totalAmount,
      orders})
  }
  );

  // update order status -- admin
exports.updateOrder=catchAsyncError(async(req,res,next)=>{
    //we apply filter on order
      const order=await Order.findById(req.params.id);
      if(!order)
      {
        return next(new ErrorHandler("Order not found with this id",404));
      }
  
      
      if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",400));
      }

      order.orderItems.forEach(async(o)=>{
        await updateStock(o.Product,o.quantity);
      });

      order.orderStatus=req.body.status;
      
    
      if(req.body.status=="Delivered")
      {
        order.deilveredAt=Date.now()
      }

      await order.save({validateBeforeSave:false});
      res.status(200).json({
      success:true,
      })
  }
  );

async function updateStock(id,quantity){
  const product=await Product.findById(id);
  product.Stock=product.Stock-quantity;
  await product.save({validateBeforeSave:false})

}

//delete order-- admin
exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
  //we apply filter on order
    const order=await Order.findById(req.params.id);
    if(!order)
    {
      return next(new ErrorHandler("Order not found with this id",404));
    }

  await order.remove()

    res.status(200).json({
    success:true,
    })
}
);

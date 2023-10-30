const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel")
exports.IsAuthenticateduser=catchAsyncError(async(req,res,next)=>{
   const {token }= req.cookies;
   
   //if token not found
   if(!token)
   {
    return next(new ErrorHandler("Please login to access this resource",401))
   }
   //if token there import iwt
   const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    
   req.user=await User.findbyId(decodedData.id);
   next();

});

exports.authorizeRoles=(...roles)=>{
   return(req,res,next)=>{

      //if does not contain user
      //eg - if req.user.role=admin ,it checks if roles contains admin
      if(!roles.includes(req.user.role)){
        return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
      }

      //if includes user
      next();   
   }
}
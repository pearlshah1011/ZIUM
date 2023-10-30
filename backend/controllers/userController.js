const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken=require("../utils/jwttoken");
const sendEmail=require("../utils/sendEmail");
const crypto=require("crypto");

//Register a user
exports.registerUser=catchAsyncError(async(req,res,next)=>{
    

    const {name,email,password}=req.body;
    const user= await User.create({
        name,email,password
    });

    sendToken(user,201,res);
})

//login user
exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const{email,password}=req.body

    //check if user gave password meail both
    if(!email || !password){
        return next(new ErrorHandler("please enter email and password",400));
    }

    const user= await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Inavlid email or password",401));
    }

    const isPasswordmatch=await user.comparePassword(password);

    if(!isPasswordmatch){
        return next(new ErrorHandler("Invalid password",401));
    }
    sendToken(user,200,res);
});

//Logout user
exports.logoutUser=catchAsyncError(async(req,res,next)=>{
    

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    });
});

//Forget password
exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
 //find the user from email the person gives
 const user=await User.findOne({email:req.body.email});
 if(!user){
    return next( new ErrorHandler("User not found",404));
 }

 //get resetpasswordtoken
 const resetToken=user.getResetPasswordToken();
 await user.save({validateBeforeSave:false});

 //link for resetpassword
 const resetPasswordUrl=`${req.protocol}://${req.get("host"
 )}localhost/api/v1/password/reset/${resetToken}`

 const message=`Your password reset token is :-\n\n ${resetPasswordUrl}\n\nIf 
 you have not requested this email then please ignore this message `;

 try{
  
    //send email
    await sendEmail({
      email:user.email,
      subject:`ZIUM Password Recovery`,
      message
    });
    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfully`,
    })
 }catch(error){
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save({validateBeforeSave:false});
    return next(new ErrorHandler(error.message,500));
 }
});

//Reset password
exports.resetPassword=catchAsyncError(async(req,res,next)=>{
    //we should find the user in database
    //saved password is in hashed form
    const resetPasswordToken=crypto
                             .createHash("sha256")
                             .update(req.params.token)
                             .digest("hex");

    const user= await User.findOne({resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},

    });
    if(!user){
     return next(new ErrorHandler("Reset password token has been expired",400)) 
    }
    //new password and confirm password different 
    if(req.body.password!==req.body.confirmPassword){
     return next(new ErrorHandler("Password does not match ",400));
    }
    //password changed
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    //login now
    sendToken(user,200,res);
});

//getuser details
exports.getUserDetails=catchAsyncError(async(req,res,next)=>{


    const user= await User.findById(req.user.id);
    // if(!user){
       //not possible for user not to find since this can only be accessed by logged in
    // }
    res.status(200).json({
        success:true,
        user,
    });
});

//update password
exports.updatePassword=catchAsyncError(async(req,res,next)=>{


    const user= await User.findById(req.user.id).select( "+password");
    
    const isPasswordmatch=await user.comparePassword(req.body.oldPassword);

    if(!isPasswordmatch){
        return next(new ErrorHandler("Old password is incorrect",400));
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400))
    }
   user.password=req.body.newPassword;
   await user.save();
   sendToken(user,200,res);
});

//update user profile
exports.updateProfile=catchAsyncError(async(req,res,next)=>{

    //get data
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    }
    //now find user and update we got data from req and we get res in return 
    const user=User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

   res.status(200).json({
    success:true,
   });
});

//get all user(admin)
exports.getAllUser=catchAsyncError(async(req,res,next)=>{
    
    const users= await User.find();

    res.status(200).json({
        success:true,
        users
    });
});

//get single user(admin)
exports.getSingleUser=catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist with id :${req.params.id}`))
    }

    req.status(200).json({
        sucess:true,
        user,

    })
});
//update user role
exports.updateRole=catchAsyncError(async(req,res,next)=>{

    //get data
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }
    //now find user and update we got data from req and we get res in return 
    const user=User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

  res.status(200).json({
    success:true,
  });
});
//Delete user --admin
exports.deleteUser=catchAsyncError(async(req,res,next)=>{

   //find user
   const user= await User.findByIdAndDelete(req.params.id);

   if(!user){
    return next(new ErrorHandler(`User does not exist with id:${req.params.id}`));
   }

   await user.remove();

   res.status(200).json({
    success:true,
   })
});


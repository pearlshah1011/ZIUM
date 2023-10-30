const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"Cannot exceed more than 30 chars"],
        minLength:[4,"Name should have more than 5 characters"]
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email-id"]
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        minLength:[8,"Password should be minimum 8 characters long"],
        select:false
    },
    role:{
    type:String,
    default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        //if password not modified
        next();

    }

    //hash password
    this.password= await bcrypt.hash(this.password,10);


});
//JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

//compare password
userSchema.methods.comparePassword=async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password);
   //this means userSchema
}

//generating password reset token
userSchema.methods.getResetPasswordToken=function(){

    //generating token
    const resetToken=crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken=crypto.createHash("sha256")
                                  .update(resetToken)
                                  .digest("hex"); 
   //expires in 15 mins
    this.resetPasswordExpire=Date.now() + 15*60*1000;

    return resetToken;
    //now make a function in usercontroller when someone forgets password

}
module.exports=mongoose.model("User",userSchema);
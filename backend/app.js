
const express = require("express");
const app = express();
app.use(express.json());
const mongoose =require('mongoose');
const connectDatabase=require("./config/database.js");

require("dotenv").config({path:"config/config.env"});
app.listen(process.env.PORT,()=>{
    console.log('connected to db and listening at port ',process.env.PORT)
});


connectDatabase();
//Route Imports
const product=require("./routes/productRoute");
app.use("/api/vi",product);
const user =require("./routes/userRoute")
app.use("/api/vi",user)

//Middle ware for error
const errormiddleware=require("./middleware/error")
app.use(errormiddleware)

//cookie
const cookieParser=require("cookie-parser");
app.use(cookieParser());
module.exports=app

require("dotenv").config();
const express = require("express");
const app = express();

app.listen(process.env.PORT,()=>{
    console.log('connected to db and listening at port ',process.env.PORT)
});


process.env;



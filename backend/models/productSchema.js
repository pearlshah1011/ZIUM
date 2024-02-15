const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"]
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter price"],
        maxLength:[8,"Price cannot exceed 8 digits"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[                //array of images for all objects
       { public_id:{
            type:String,
            required:true

        },
        url:{
            type:String,
            required:true

        }
    }
    ],
    category:{
        type:String,
        required:[true,"Please enter category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please enter number of items"],
        maxLength:[5,"Stock cannot exceed 10000"],
        default:1
    },
    NumberofReviews:{
        type:Number,
        default:1
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
               },
           name:{type:String,
                required:[true,"Please enter your name"]
                 } ,
           rating:{
            type:Number,
            required:true,

           },
           comment:{
            type:String,

           }

        }
    ],

    //to know which admin user created the product
    user:{
     type:mongoose.Schema.ObjectId,
     ref:"User",
     required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
   


})

//export this model
module.exports=mongoose.model("Product",productSchema);
//now import this in controller
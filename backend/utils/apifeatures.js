class Apifeatures{
    constructor(query,queryStr){

        //query in url is anything after ? 
        //keyword=someword we put -- this is query
        this.query=query;
        this.queryStr=queryStr;
    }

    //search feature
    search(){
        const keyword=this.queryStr.keyword?
        //Apifeatures(Product.find(),req.query)
        //req.query is our queryStr
        {
            name:{
                $regex: this.queryStr.keyword,
                $options:"i"//case insensitive
            }
        }:{};
        console.log(keyword)
        this.query=this.query.find({...keyword});
        return this;
    }

    //filter feature
    filter(){
        // const querycopy=this.queryStr -- this wont work as queryStr is passed by reference any change in copy leads to change in query str
        const queryCopy={...this.queryStr}//copy made
       
        //removing some fields
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>delete queryCopy[key])
        //query copy mei jo bhi fields hai (keyword,page,limit) wo delete ho jayega
           

       //filter for price
       let queryStr=JSON.stringify(queryCopy);
       queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$$(key)`);
        //this.query => product.find() method
        this.query=this.query.find(JSON.parse(queryCopy));
        return this;
    }

    //pagination showing things on different page
    pagination(resultPerpage){
        const currentPage=Number(this.queryStr.page) || 1;
       //how many products to skip
       //1st pg no skip
       //2nd page resultperpage skipped
        const skip=resultPerpage*(currentPage-1);
          //we applied limit on product.find()
        this.query=this.query.limit(resultPerpage).skip(skip);
        return this;
    }
}

module.exports=Apifeatures;
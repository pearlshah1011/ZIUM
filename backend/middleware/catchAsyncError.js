module.exports = theFunc=>(req,res,next)=>{
        //try                                //catch
    Promise.resolve(theFunc(req,res,next)).catch(next);
};
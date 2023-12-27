const syncErrorHandling=(error,req,res,next)=>{
    
    const stCode = res.statusCode ==200 ? 500 : res.statusCode;

    res.status(stCode)
       .json({
        status: "Failed",
        message: error?.message,
        stack: error?.stack
       });
}
module.exports=syncErrorHandling;
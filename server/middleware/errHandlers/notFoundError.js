const notFound=(req,res,next)=>{
    const error = new Error(`Not found at ${req.originalUrl}`);
    res.status(404);
    next(error);
};
module.exports=notFound;
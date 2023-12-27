const isAthenticatedAdmin=(req,res,next)=>{
    if(req.user.role=="admin"){
        next();
    }else{
        throw new Error("Access denied");
    }
}
module.exports=isAthenticatedAdmin;
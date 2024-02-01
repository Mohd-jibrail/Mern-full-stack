const zod = require("zod")
const userLogIn = zod.object({
    email:zod.string().email(),
    password:zod.string().min(10).max(20)
});
const userLogInValidation = (req,res,next)=>{
    const isValidRequest = userLogIn.safeParse(req.body);
    if(!isValidRequest.success){
        res.status(400).json({
            status:"Failed",
            message:"Validation failed",
            error:isValidRequest.error.errors
        })
    };
}
module.exports= userLogInValidation;
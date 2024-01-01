const zod = require('zod');
const UserZodModel = zod.object({
    firstName:zod.string().min(3).max(20),
    lastName:zod.string().min(3).max(20),
    phoneNo:zod.string().refine((phoneNo)=> /^\d{10}$/i.test(phoneNo),{message:"Invalid phone number"}),
    email:zod.string().email(),
    password:zod.string().min(10).max(20)
});
const UserZodModelValidation = (req,res,next)=>{
    const validationResult = UserZodModel.safeParse(req.body);
    if(validationResult.success){
        req.validateUser =validationResult.data;
        next();
    }else{
        res.status(400).json({
            status:"Failed",
            message:"Validation failded",
            stack:validationResult.error.errors
        });
    };
}
module.exports={UserZodModelValidation}

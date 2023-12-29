const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
    firstName:{ type:String, require:true},
    lastName:{type:String, require:true},
    phoneNo:{type:Number, require:true, minLength:10,maxLength:10},
    email:{ type:String, require:true,minLength:5},
    password:{ type:String, require:true},
    address:{
            street:{type:String, require:true},
            city:{ type:String, require:true},
            zipcode:{type:Number,minLength:6, maxLength:6, require:true},
            state:{type:String, maxLength:20 ,require:true}
        },
    cart:[{
            product:{type:mongoose.Schema.ObjectId, ref:"Product"},
            tile:{ type:String, require:true},
            price:{type:String, require:true},
        }],
    role:{
        type:Array, default:"USER"
    },
    isActive:{type:Boolean, default:"true"}
},{
    createdAt:{ type:Date, default: Date.now}
});


userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password= await bcrypt.hash(this.password,salt);
})
userSchema.methods.isPasswordMatched=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
const User =mongoose.model("User",userSchema);
module.exports=User;
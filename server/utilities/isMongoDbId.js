const mongoose = require("mongoose")
const isValidMongoDbId=(id)=>{
    const isValidId = mongoose.Schema.ObjectId.isValid(id);
    if(!isValidId) throw new Error("Invalid mongoDb Id")
}
module.exports=isValidMongoDbId;
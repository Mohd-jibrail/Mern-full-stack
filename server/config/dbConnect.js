const mongoose = require("mongoose");

const dbConnect=()=>{
    try{
        mongoose.connect("mongodb://localhost:27017/zahra",{
         useNewUrlParser : true,
         useUnifiedTopology : false
       })
        .then(()=>{console.log(`DataBase connected ${mongoose.connection.host}`)});
      }catch(e){console.log(e);}
};
module.exports=dbConnect;

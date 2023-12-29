const express = require("express");
const dbConnection = require("./config/dbConnect");
const notFoundError = require("./middleware/errHandlers/notFoundError");
const syncErrorHandler = require("./middleware/errHandlers/syncErrorHandling");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotEnv = require("dotenv");
const zahra_server = express();

/*Handling Uncaught Exception*/
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Uncaught Exception`);
    process.exit(1);
});

/*Database Config*/
dotEnv.config();
dbConnection();

/*Setting up Json Obj pipeline*/
zahra_server.use(cookieParser());
zahra_server.use(bodyParser.json());
zahra_server.use(bodyParser.urlencoded({extended:false}));

/*All the routes*/
zahra_server.use("/api/auth", authRoutes);
zahra_server.use("/api/prod",productRoutes);
zahra_server.use("/api/order",orderRoutes)
/*Middleware*/
zahra_server.use(notFoundError);
zahra_server.use(syncErrorHandler);

zahra_server.listen(3000,()=>{
    console.log(`Server is running on:: 3000`);
});

/*Unhandled Promise Rejection*/
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Unhandled Promise Rejection`);
    
    zahra_server.close(() => {
      process.exit(1);
    });
});
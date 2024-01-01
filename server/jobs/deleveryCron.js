const AllOrders = require("../models/order.model");
const orderAddToDeleveryCronJob = require("node-cron");
module.exports=orderAddToDeleveryCronJob.schedule("*****",()=>{
    AllOrders.find()
    .then(orders=>{orders.forEach(order => order.save())})
    .catch(err=> console.log(err));
 });
const mongoose = require("mongoose");
const orderHistorySchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    order:{type:mongoose.Schema.Types.ObjectId,ref:'Order',required:true},
    status:{type:String},
    updatedAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model('OrderHistory',orderHistorySchema)
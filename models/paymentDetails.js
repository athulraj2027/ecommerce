const mongoose = require("mongoose");
const paymentDetailsSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  method: { type: String, enum: ["Card", "Paypal", "COD"], required: true },
  status: {
    type: String,
    enum: ["Pending", "Successful", "Failed"],
    default: "Pending",
  },
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PaymentDetails", paymentDetailsSchema);

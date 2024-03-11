const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userId: { type: String, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  status: { type: String, default: "created" },
  quantity: { type: Number, default: 1 },
  totalAmount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

orderSchema.pre("save", function (next) {
  this.updatedOn = new Date();
  this.createdOn = new Date();
});

cartSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
  this.updatedOn = new Date();

  next();
});

const OrderModel = model("Order", orderSchema);
module.exports = OrderModel;

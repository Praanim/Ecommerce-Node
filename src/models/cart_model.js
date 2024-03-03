const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema({
  user: { type: String, ref: "User", required: true },
  items: { type: [cartItemSchema], default: [] },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

cartSchema.pre("save", function (next) {
  //this keyword refers to document trying to be saved

  this.updatedOn = new Date();
  this.createdOn = new Date();

  next();
});

cartSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
  const update = this.getUpdate();

  delete update._id; // we r deleting this to make sure this is
  //not updated
  this.updatedOn = new Date();

  next();
});

const CartModel = model("Cart", cartSchema);

module.exports = CartModel;

const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
});

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, default: "", required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, unique: true },
  address: { type: addressSchema },
  profileImage: { type: String, default: "" },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

userSchema.pre("save", function (next) {
  //this keyword refers to document trying to be saved
  this.updatedOn = new Date();
  this.createdOn = new Date();

  next();
});

// userSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
//   const update = this.getUpdate();

//   delete update._id;
//   delete update.id;

//   this.updatedOn = new Date();

//   next();
// });

const UserModel = model("User", userSchema);

module.exports = { UserModel, addressSchema };

/*
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
 */

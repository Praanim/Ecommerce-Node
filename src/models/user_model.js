const { Schema, model } = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, default: "", required: true },
  email: { type: String, unique: true, required: true },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
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

module.exports = UserModel;

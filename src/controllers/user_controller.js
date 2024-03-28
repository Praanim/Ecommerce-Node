const { UserModel } = require("../models/user_model");

class UserController {
  static async createAccount(req, res) {
    try {
      const userData = req.body;
      const newUser = new UserModel(userData);
      await newUser.save();

      return res.status(201).json({ success: true, message: newUser });
    } catch (ex) {
      return res.status(500).json({ success: false, message: ex });
    }
  }

  //function to sign in user

  static async getUserByEmail(req, res) {
    try {
      const { email } = req.query;

      const foundUser = await UserModel.findOne({ email: email });

      if (!foundUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      return res.status(200).json({ success: true, message: foundUser });
    } catch (ex) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  //function to update user details
  static async updateUser(req, res) {
    try {
      const user = req.body;

      const updatedUser = await UserModel.findOneAndUpdate(
        { id: user.id },
        {
          $set: {
            profileImage: user.profileImage,
            address: user.address,
            mobile: user.mobile,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      return res.status(200).json({ success: true, message: updatedUser });
    } catch (e) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}

module.exports = UserController;

const UserModel = require("../models/user_model")


class UserController {

    static async createAccount(req,res) {
        try{
            const userData = req.body;
            const newUser = new UserModel(userData);
            await newUser.save();

            return res.status(201).json({success:true ,message:newUser});
        }catch(ex){
            return res.status(500).json({success:false,message:ex});
        }
    }
}

module.exports = UserController;

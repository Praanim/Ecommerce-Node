const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");


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

    //function to sign in user

    static async signInUser(req,res) {
        try{
            const {email,password} = req.body;

            const foundUser = await UserModel.findOne({email:email});

            if(!foundUser){
                return res.status(404).json({success:false , message: "User not found"});
            }

            const isMatched = bcrypt.compareSync(password,foundUser.password);

            if(!isMatched){
                return res.status(401).json({success:false, message:"Password doesn't match"});
            }

            return res.status(200).json({success:true,message:foundUser});

        }catch(ex){
            return res.status(500).json({success:false,message:"Internal Server Error"});
        }
    }
}

module.exports = UserController;

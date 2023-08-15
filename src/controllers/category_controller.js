const CategoryModel = require("../models/category_model");


class CategoryController {

    static async createCategory(req,res){
        try{
            const categoryData = req.body;
            const newCategory = new CategoryModel(categoryData);
            await newCategory.save();

            return res.status(201).json({success:true, data:newCategory, message : "Category Created"});

        }catch(ex){
            return res.status(500).json({success:false, message :"Internal Server Error"});
        }
    }

    //fetch all categories

    static async getAllCategories(req,res){
        try{
            const allCategories = await CategoryModel.find();
            return res.status(200).json({success:true, data:allCategories});

        }catch(ex){
            return res.status(500).json({success:false, message :"Internal Server Error"});
        }
    }
    
}

module.exports = CategoryController;
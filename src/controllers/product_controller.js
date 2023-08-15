const ProductModel = require("../models/product_model");


class ProductController {

    static async createProduct(req,res){
        try{
            const productData = req.body;
            const newProduct = new ProductModel(productData);
            await newProduct.save();

            return res.status(201).json({success:true, data:newProduct, message : "Product Created"});

        }catch(ex){
            return res.json({success:false, message :ex});
        }
    }

    //fetch all products

    static async getAllProducts(req,res){
        try{
            const allProducts = await ProductModel.find();
            return res.status(200).json({success:true, data:allProducts});

        }catch(ex){
            return res.json({success:false, message :ex});
        }
    }
    
    //get products filtered by category
    static async getProductsByCategory(req,res){

        try{
            const categoryId = req.params.id;
            const categoryProducts = await ProductModel.find({category:categoryId});
            return res.status(200).json({success:true, data:categoryProducts});

        }catch(ex){
            return res.json({success:false, message :ex});

        }
    }
}

module.exports = ProductController;
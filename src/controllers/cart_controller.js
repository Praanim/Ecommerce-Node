const CartModel = require("../models/cart_model");

class CartController {

    static async addToCart (req,res){
        try{
            const { user , product , quantity} = req.body;

            const foundCart = await CartModel.findOne({user:user});

            //if a cart is missing then we create a cart
            if(!foundCart){
                const newCart = await CartModel({user:user});
                newCart.items.push({
                    product:product,
                    quantity:quantity
                });

                await newCart.save();
                return res.json({success:true, data:newCart ,message:"Cart Created"});
            }
            //if cart already exists
          const updatedCart =  await CartModel.findOneAndUpdate(
                {user:user},
                {$push: {items: {product: product , quantity:quantity}}},
                {new:true}
            )
            return res.json({success:true, data:updatedCart ,message:"Cart Updated"});
        }catch(ex){
            return res.json({success:false, message:ex});

        }   
    }
}

module.exports = CartController;
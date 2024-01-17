const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT= 3000;
const UserRoutes = require("./src/routes/user_routes")
const CategoryRoutes = require("./src/routes/category_routes");
const ProductRoutes = require("./src/routes/product_routes");
const CartRoutes = require("./src/routes/cart_routes");




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//app routes
app.use("/api/user",UserRoutes);
app.use("/api/category",CategoryRoutes);
app.use("/api/product",ProductRoutes);
app.use("/api/cart",CartRoutes);




//db-->name = ecommerce
const mongoDbPath= "mongodb+srv://pranimsingh7:pranim2580@cluster0.scwvxin.mongodb.net/ecommerce?retryWrites=true&w=majority";
mongoose.connect(mongoDbPath).then(
    function(){
        app.get('/',function(req,res){
            res.send("This is home page");
        });
        
    }
);



app.listen(PORT,function(){
    console.log(`Server Started at PORT: ${PORT}`);
})
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserRoutes = require("./src/routes/user_routes");
const CategoryRoutes = require("./src/routes/category_routes");
const ProductRoutes = require("./src/routes/product_routes");
const CartRoutes = require("./src/routes/cart_routes");
const OrderRoutes = require("./src/routes/order_routes");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app routes
app.use("/api/user", UserRoutes);
app.use("/api/category", CategoryRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/order", OrderRoutes);

//db-->name = ecommerce
const mongoDbPath = process.env.MONGO_DB_PATH;
mongoose.connect(mongoDbPath).then(function () {
  app.get("/", function (req, res) {
    res.send("This is home page");
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log(`Server Started at PORT: ${PORT}`);
});

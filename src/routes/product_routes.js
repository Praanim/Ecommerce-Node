const router = require("express").Router();
const ProductController = require("../controllers/product_controller");

router.post('/',ProductController.createProduct);
router.get('/',ProductController.getAllProducts);

module.exports = router;
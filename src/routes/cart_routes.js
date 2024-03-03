const router = require("express").Router();
const CartController = require("../controllers/cart_controller");

router.get("/:userId", CartController.getCartForUser);
router.post("/", CartController.addToCart);
router.delete("/", CartController.removeItemFromCart);

module.exports = router;

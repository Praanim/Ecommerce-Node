const { Router } = require("express");
const router = Router();
const OrderController = require("../controllers/order_controller");

router.get("/:userId", OrderController.getOrderByUserId);
router.post("/", OrderController.createOrder);
router.put("/", OrderController.updateOrderById);

module.exports = router;

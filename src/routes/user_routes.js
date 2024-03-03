const router = require("express").Router();
const UserController = require("../controllers/user_controller");

router.post("/", UserController.createAccount);
router.get("/", UserController.getUserByEmail);

module.exports = router;

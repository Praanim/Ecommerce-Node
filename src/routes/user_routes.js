const router = require("express").Router();
const UserController = require("../controllers/user_controller");


router.post('/createAccount',UserController.createAccount);
router.post('/signIn',UserController.signInUser);


module.exports = router;
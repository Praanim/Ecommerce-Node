const router = require("express").Router();
const CategoryController = require("../controllers/category_controller");

router.post('/',CategoryController.createCategory);
router.get('/all',CategoryController.getAllCategories);

module.exports = router;
const router = require('express').Router();
const Authentication = require('../middlewares/Authentication');
const ProductValidation = require('../validations/ProductValidation');


const ProductController = require('../controllers/Product.controller');

router.post("/createProduct",Authentication,ProductValidation.productValidation,ProductController.CreateProduct)
router.post("/createCategory",Authentication,ProductValidation.categoryValidation,ProductController.CreateCategory)
router.post("/createSubCategory",Authentication,ProductValidation.subCategoryValidation,ProductController.CreateSubCategory)
router.get("/getAll",Authentication,ProductController.GetAll)
router.delete("/deleteProduct/:id",Authentication,ProductController.DeleteProduct)
router.delete("/deleteCategory/:id",Authentication,ProductController.DeleteCategory)
router.delete("/deleteSubCategory/:id",Authentication,ProductController.DeleteSubCategory)
router.put("/editCategory/:id",Authentication,ProductValidation.categoryValidation,ProductController.EditCategory)
router.put("/editSubCategory/:id",Authentication,ProductValidation.subCategoryValidation,ProductController.EditSubCategory)
router.put("/editProduct/:id",Authentication,ProductValidation.productValidation,ProductController.EditProduct)
router.get("/alertProduct",Authentication,ProductController.AlertProduct)

module.exports = router;

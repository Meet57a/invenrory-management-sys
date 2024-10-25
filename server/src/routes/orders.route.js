const router = require('express').Router();
const Authentication = require('../middlewares/Authentication');
const ProductValidation = require('../validations/ProductValidation');
const OrderController = require('../controllers/Order.controller');

router.get("/getOrders",Authentication,OrderController.GetOrders)
router.put("/orderStatus/:id",Authentication,OrderController.OrderStatus)

module.exports = router;

const httpStatus = require("http-status");
const CatchAsync = require("../utils/CatchAsync");
const OrderService = require("../services/Order.service");

class OrderController {
    static GetOrders = CatchAsync(async (req, res) => {
        const res_obj = await OrderService.GetAllOrders();
        res.status(httpStatus.OK).send(res_obj);
    });

    static OrderStatus = CatchAsync(async (req, res) => {
        const res_obj = await OrderService.OrderStatus(req.body, req.params.id);
        res.status(httpStatus.OK).send(res_obj);
    });
   
}

module.exports = OrderController;
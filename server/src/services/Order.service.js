const httpStatus = require("http-status");
const OrdersModel = require("../models/orders.model")
const ApiError = require("../utils/ApiError");

class OrderService {

    static async OrderStatus(body, id) {
        const { OrederAcceptedOrNot, Status } = body;
        const order = await OrdersModel.findByIdAndUpdate(id, {
            $set: {
                OrederAcceptedOrNot: OrederAcceptedOrNot,
                Status: Status
            }
        }, { new: true });
        if (order) {
            return { message: "Order Status Updated", status: httpStatus.OK, data: order }
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Order not Found")
        }
    }

    static async GetAllOrders() {
        const orders = await OrdersModel.find({});
        if (orders) {
            return { message: "Orders Found", status: httpStatus.OK, data: orders }
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Orders not Found")

        }
    }

}

module.exports = OrderService;
const ProductModel = require('../models/product.model')
const ApiError = require('../utils/ApiError')
const httpStatus = require("http-status");

exports.qrScan = async (id) => {
    try {
        console.log(id);

        if (id === null || id !== "inventory") {
            throw new ApiError(httpStatus.BAD_REQUEST, "Invalid QR Code")
            return
        }
        const product = await ProductModel.find({});
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, "Product not found")
            return
        }

        return { message: "Product fetched successfully", product: product }
    } catch (error) {
        console.log(error);

    }

}

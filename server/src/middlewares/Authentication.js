const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const {verifyToken} = require('../utils/Token.utils')

const Authentication = (req, res, next) => {
    try {
        const headers = req.headers['authorization'];

        if (!headers) {
            throw new ApiError(httpStatus.UNAUTHORIZED,"Please Login First")
        }
        const authToken = headers.split(" ")[1]

        if (!authToken) {
            throw new ApiError(httpStatus.UNAUTHORIZED,"Please Provide valid info")
        }
        const data = verifyToken(authToken);
      
        req.user = data;

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = Authentication;
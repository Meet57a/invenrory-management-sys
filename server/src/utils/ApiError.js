class ApiError extends Error {
    statusCode = 500; 
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ApiError;
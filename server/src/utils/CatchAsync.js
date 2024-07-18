const CatchAsync = (fn) => {
    return Promise.resolve(fn(req, res, next)).catch((error) => {
        console.log("Promise Error: ", error);
        next(error);    
    });
}

module.exports = CatchAsync;

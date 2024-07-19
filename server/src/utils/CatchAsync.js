const CatchAsync = (fn) => async (req,res,next)=>{
    try {
        return await Promise.resolve(fn(req, res, next));
    } catch (error) {
        console.log("Promise Error: ", error);
        next(error);
    }
}

module.exports = CatchAsync;

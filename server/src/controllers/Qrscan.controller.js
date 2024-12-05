const httpStatus = require("http-status");
const CatchAsync = require("../utils/CatchAsync");
const QrService = require("../services/Qr.service");

exports.qrScan = CatchAsync(async (req, res) => {
    console.log(req.params.id+"dddd");
    
    const res_obj = await QrService.qrScan(req.params.id);
    res.status(httpStatus.CREATED).send(res_obj);
})
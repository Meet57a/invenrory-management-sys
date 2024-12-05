const OrderPdfService = require('../../services/pdf/createOrderPdf');
const ReportPdfService = require('../../services/pdf/createReportPdf');

const jwt = require('jsonwebtoken');
const CatchAsync = require("../../utils/CatchAsync");
const httpStatus = require("http-status");



class PdfController {
    static CreatePdfController = CatchAsync(async (req, res) => {
        const res_obj = await OrderPdfService(req.params.orderId, res);
        res.status(httpStatus.CREATED).send(res_obj);
    })

    static CreateReportPdfController = CatchAsync(async (req, res) => {
        console.log("Dddddd");
        const res_obj = await ReportPdfService();
        res.status(httpStatus.CREATED).send(res_obj);
    })

}

module.exports = PdfController;
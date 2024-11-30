const Authentication = require('../middlewares/Authentication');
const PdfController = require('../controllers/pdf/pdfController');
const router = require('express').Router();

router.get("/createPdf/:orderId",Authentication,PdfController.CreatePdfController)
router.get("/createReportPdf",Authentication,PdfController.CreateReportPdfController)

module.exports = router;
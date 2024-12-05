var pdf = require("pdf-creator-node");
var fs = require("fs");
const pdfDataSet = require('./dataSet/report');
const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");


var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
};

const CreateReportPdf = async (req, res) => {
    try {
        const doc = await pdfDataSet();

        var document = {
            html: doc,
            data: {
            },
            path: "./files/reportProduct.pdf",
            type: "",
        }
        const createPdfFunc = await pdf.create(document, options);

        if (createPdfFunc) {
            return { message: "Pdf Created Successfully", status: httpStatus.CREATED, data: { path: "http://localhost:8000/files/reportProduct.pdf" } }
        } else {
            return { message: "Pdf Creation Failed", status: httpStatus.INTERNAL_SERVER_ERROR }
        }

    } catch (error) {
        console.log(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
        
    }
}

module.exports = CreateReportPdf;
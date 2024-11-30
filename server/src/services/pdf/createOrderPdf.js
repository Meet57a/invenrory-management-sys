// var pdf = require("pdf-creator-node");
// var fs = require("fs");
// const pdfDataSet = require('./dataSet/order');
// const httpStatus = require("http-status");

// var options = {
//     format: "A4",
//     orientation: "portrait",
//     border: "10mm",
// }

// const createOrderPdf = async (orderId, res) => {
//     try {
//         console.log(orderId);
//         if (!orderId) {
//             return { message: "Order Id is required", status: httpStatus.BAD_REQUEST }
//         }
//         const doc = await pdfDataSet(orderId);

//         // var document = {
//         //     html: doc,
//         //     data: {
                
//         //     },
//         //     path: "./files/output.pdf",
//         //     type: "",
//         // };

//         // const createPdfFunc = await pdf.create(document, options);


//         // if (createPdfFunc) {
//         //     return { message: "Pdf Created Successfully", status: httpStatus.CREATED, data: { path: "http://localhost:8000/files/output.pdf" } }
//         // } else {
//         //     return { message: "Pdf Creation Failed", status: httpStatus.INTERNAL_SERVER_ERROR }
//         // }
//     } catch (error) {
//         console.log(error);
//         throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
//     }
// }



// module.exports = createOrderPdf;
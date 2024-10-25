const httpStatus = require("http-status");
const CatchAsync = require("../utils/CatchAsync");
const ProductService = require("../services/Product.service");
const jwt = require("jsonwebtoken");


class PrductController {
    static CreateProduct = CatchAsync(async (req, res) => {
        const res_obj = await ProductService.CreateProduct(req.body);
        res.status(httpStatus.CREATED).send(res_obj);
    })

    static CreateCategory = CatchAsync(async (req, res) => {
        const res_obj = await ProductService.CreateCategory(req.body);
        res.status(httpStatus.CREATED).send(res_obj);
    })

    static CreateSubCategory = CatchAsync(async (req, res) => {
        const res_obj = await ProductService.createSubCategory(req.body);
        res.status(httpStatus.CREATED).send(res_obj);
    })

    static GetAll = CatchAsync(async (req, res) => {
        const res_obj = await ProductService.GetAll();
        res.status(httpStatus.OK).send(res_obj);
    })

    static DeleteProduct = CatchAsync(async (req, res) => {
        const res_obj = await ProductService.DeleteProduct(req.params.id);
        res.status(httpStatus.OK).send(res_obj);
    })

    static DeleteCategory = CatchAsync(async (req, res) => {
        const res_obj = await ProductService.DeleteCategory(req.params.id);
        res.status(httpStatus.OK).send(res_obj);
    })

    static DeleteSubCategory = CatchAsync(async (req, res) => {
        const res_obj = await ProductService.DeleteSubCategory(req.params.id);
        res.status(httpStatus.OK).send(res_obj);
    })

    static EditCategory = CatchAsync(async (req, res) => {
        console.log(req.body);

        const res_obj = await ProductService.EditCategory(req.params.id, req.body);
        res.status(httpStatus.OK).send(res_obj);
    })

    static EditSubCategory = CatchAsync(async (req, res) => {
        const res_obj = await ProductService.EditSubCategory(req.params.id, req.body);
        res.status(httpStatus.OK).send(res_obj);
    })

    static EditProduct = CatchAsync(async (req, res) => {
        const res_obj = await ProductService.EditProduct(req.params.id, req.body);
        res.status(httpStatus.OK).send(res_obj);
    })

    static GetOrders = CatchAsync(async (req, res) => {
        const res_obj = await ProductService.GetAllOrders();
        res.status(httpStatus.OK).send(res_obj);
    })

    static AlertProduct = CatchAsync(async (req, res) => {
        const headers = req.headers['authorization'];
        const token = headers.split(" ")[1];
        const decodeToken = jwt.decode(token);
        const id = decodeToken['userid'];
        const res_obj = await ProductService.alertServiceForProduct(id);
        console.log("callled");
        
        res.status(httpStatus.OK).send(res_obj);
    })



}

module.exports = PrductController;
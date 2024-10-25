const httpStatus = require("http-status");
const OrdersModel = require("../models/orders.model")
const ApiError = require("../utils/ApiError");
const ProductModel = require("../models/product.model");
const CategoryModel = require("../models/category.model");
const SubCategoryModel = require("../models/subcategory.model");
const UserModel = require("../models/user.model");
const nodemailer = require('nodemailer');


class ProductService {
    static async CreateProduct(body) {
        const { Title, Price, Quantity, Stock, Category, SubCategory, Image, Visible, Description, LimitLowStock } = body;
        const checkExist = await ProductModel.findOne({ Title: Title, Category: Category, SubCategory: SubCategory });
        if (checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Product Already Exists in this category and subcategory")
            return
        }

        //generate custom id only numerical and lenght is 4
        const generateId = () => {
            let result = 'PRD';
            const characters = '0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 4; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            return result;
        }
        const product = await ProductModel.create({ DisplayId: generateId(), Title: Title, Price: Price, Quantity: Quantity, Stock: Stock, Category: Category, SubCategory: SubCategory, Visible: Visible, Description: Description, LimitLowStock: LimitLowStock });
        if (product) {
            return { message: "Product Created Successfully.", status: httpStatus.CREATED }
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, "Product not Created")
        }

    }

    static async CreateCategory(body) {
        const { Category } = body;
        const checkExist = await CategoryModel.findOne({ Category: Category });
        if (checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Category Already Exists")
            return
        }

        const categoryModel = await CategoryModel.create({ Category: Category });
        if (categoryModel) {
            return { message: "Category Created Successfully.", status: httpStatus.CREATED }
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, "Category not Created")
        }
    }

    static async createSubCategory(body) {
        const { Category, SubCategory } = body;
        const checkCategory = await CategoryModel.findOne({ Category: Category });
        const checkSubCategory = await SubCategoryModel.findOne({ SubCategory: SubCategory, Category: Category });

        if (checkCategory && checkSubCategory) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Already exists")
            return
        }

        const subCategoryModel = await SubCategoryModel.create({ Category: checkCategory.Category, SubCategory: SubCategory });
        if (subCategoryModel) {
            return { message: "SubCategory Created Successfully.", status: httpStatus.CREATED }
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, "SubCategory not Created")
        }
    }

    static async GetAll() {
        const products = await ProductModel.find({});
        const categories = await CategoryModel.find({});
        const subcategories = await SubCategoryModel.find({});
        if (products) {
            return { message: "Products Found", status: httpStatus.OK, products: products, categories: categories, subcategories: subcategories }
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Products not Found")
        }
    }

    static async DeleteProduct(id) {
        const product = await ProductModel.findByIdAndDelete(id);
        if (product) {
            return { message: "Product Deleted Successfully.", status: httpStatus.OK }
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Product not Found")
        }
    }

    static async DeleteCategory(id) {
        const category = await CategoryModel.findByIdAndDelete(id);
        if (category) {
            await SubCategoryModel.deleteMany({ Category: category.Category });
            await ProductModel.deleteMany({ Category: category.Category });
            return { message: "Category Deleted Successfully.", status: httpStatus.OK }
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Category not Found")
        }
    }

    static async DeleteSubCategory(id) {
        const subcategory = await SubCategoryModel.findByIdAndDelete(id);
        if (subcategory) {
            await ProductModel.deleteMany({ SubCategory: subcategory.SubCategory });
            return { message: "SubCategory Deleted Successfully.", status: httpStatus.OK }
        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "SubCategory not Found")
        }
    }

    static async EditCategory(id, body) {
        const { Category } = body;
        console.log(body);

        const existCategory = await CategoryModel.findById(id);
        if (!existCategory) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Category not found")
            return
        }
        const updateSubCategory = await SubCategoryModel.updateMany({ Category: existCategory.Category }, {
            $set: {
                Category: Category,
            }
        });
        const updateProduct = await ProductModel.updateMany({ Category: existCategory.Category }, {
            $set: {
                Category: Category,
            }
        });
        if (updateSubCategory && updateProduct) {
            const updateCategory = await CategoryModel.findByIdAndUpdate(id, {
                $set: {
                    Category: Category,
                }
            }, { new: true });
            console.log(existCategory.Category);


            if (updateCategory && updateSubCategory) {
                return { message: "Category Updated Successfully.", status: httpStatus.OK }
            } else {
                throw new ApiError(httpStatus.NOT_FOUND, "Category not Updated")
            }
        }
    }

    static async EditSubCategory(id, body) {
        const { Category, SubCategory } = body;
        const existCategory = await CategoryModel.findOne({ Category: Category });
        const existSubCategory = await SubCategoryModel.findById(id);
        if (!existCategory || !existSubCategory) {
            throw new ApiError(httpStatus.BAD_REQUEST, "not found")
            return
        }

        const updateProduct = await ProductModel.updateMany({ SubCategory: existSubCategory.SubCategory, Category: existSubCategory.Category }, {
            $set: {
                SubCategory: SubCategory,
                Category: Category

            }
        });
        if (updateProduct) {
            const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(id, {
                $set: {
                    SubCategory: SubCategory
                }
            }, { new: true });

            const updateCategory = await SubCategoryModel.findByIdAndUpdate(id, {
                $set: {
                    Category: Category
                }
            }, { new: true });

            if (updateSubCategory && updateCategory) {
                return { message: "SubCategory Updated Successfully.", status: httpStatus.OK }
            } else {
                throw new ApiError(httpStatus.NOT_FOUND, "SubCategory not Updated")
            }
        }

    }

    static async EditProduct(id, body) {
        try {
            const { Title, Price, Quantity, Stock, Category, SubCategory, Visible, Description, LimitLowStock } = body;

            const product = await ProductModel.findByIdAndUpdate(id, {
                $set: {
                    Title: Title,
                    Price: Price,
                    Quantity: Quantity,
                    Stock: Stock,
                    Category: Category,
                    SubCategory: SubCategory,
                    Visible: Visible,
                    Description: Description,
                    LimitLowStock: LimitLowStock
                }
            }, { new: true });
            if (product) {
                return { message: "Product Updated Successfully.", status: httpStatus.OK }
            } else {
                throw new ApiError(httpStatus.NOT_FOUND, "Product not Updated")
            }
        } catch (error) {
            console.log(error);

        }
    }

    static async alertServiceForProduct(id) {
        const products = await ProductModel.find({});
        const lowStockProduct = [];
        products.map((product) => {
            if (product.Stock <= product.LimitLowStock) {
                lowStockProduct.push(product);
            }
        })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'meetsenjaliya01@gmail.com', // Replace with your Gmail email address
                pass: 'lhdt yqfs dqyr qbkh', // Replace with your Gmail password
            },
        });
        if (lowStockProduct.length > 0) {
            console.log(id);
            const UserId = await UserModel.findById(id)


            console.log(UserId.email);

            const mailOptions = {
                from: 'meetsenjaliya01@gmail.com',
                to: UserId.email,
                subject: 'Stock Alert',
                
                html: `<html>
                        <head>
                          
                        </head>
                        <body>
                          
                                ${lowStockProduct.map(product => `
                                    <div style="background-color: #f4f4f4; padding: 20px;">
                                <h1 style="color: red;">Stock Alert</h1>
                                <p>Product Id: ${product._id} </p>
                                <p>Stock is low for <b style = "color: red">${product.Title}</b> please check and update stock</p>
                                <p>${product.Stock} Stock remaining</p>
                                <p>${product.LimitLowStock} Limit low stock</p>
                                <p>Category : ${product.Category}</p>
                                <p>SubCategory : ${product.SubCategory}</p>
                            </div>
                                `).join('')
                    }
                            
                        </body>
                    </html>`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);

                    return { message: 'Failed to send email.' };
                } else {
                    return { message: 'email sent successfully.', status: httpStatus.OK };
                }
            });


        } else {
            throw new ApiError(httpStatus.NOT_FOUND, "Low Stock Products not Found")
        }
    }

}

module.exports = ProductService;
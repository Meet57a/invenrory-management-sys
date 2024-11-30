const ProductModel = require('../../../models/product.model');
const CategoryModel = require('../../../models/category.model');
const SubCategoryModel = require('../../../models/subcategory.model');
const fs = require('fs');
const path = require('path');

const setDataReport = async () => {
    
    const products = await ProductModel.find();
    const categories = await CategoryModel.find();
    const subCategories = await SubCategoryModel.find();
    
    const templatePath = path.join(__dirname, '../reportHtmlTemplate.html');
    let html = fs.readFileSync(templatePath, 'utf8');
  

    // html = html.replace('{{totalProducts}}', products.length)
    //     .replace('{{totalStock}}', products.reduce((acc, item) => acc + item.Stock, 0))
    //     .replace("{{totalLowStock}}", products.filter(item => item.Stock < 10).length)


    // html = html.replace("{{categories}}", categories.map(item => {
    //     return item.Category
    // }))

    // // html = html.replace("{{subCategories}}", subCategories.map(item => {
    // //     return item.SubCategory
    // // }))


}

module.exports = setDataReport;
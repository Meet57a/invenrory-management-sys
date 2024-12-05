const ProductModel = require('../../../models/product.model');
const CategoryModel = require('../../../models/category.model');
const SubCategoryModel = require('../../../models/subcategory.model');
const fs = require('fs');
const path = require('path');
const ApiError = require("../../../utils/ApiError");


const setDataReport = async () => {

    try {
        const products = await ProductModel.find();
        const categories = await CategoryModel.find();
        const subCategories = await SubCategoryModel.find();

        const templatePath = path.join(__dirname, '../reportHtmlTemplate.html');
        let html = fs.readFileSync(templatePath, 'utf8');


        html = html.replace('{{totalProducts}}', products.length)
            .replace('{{totalStock}}', products.filter(item => item.Visible === "true").length)
            .replace("{{totalLowStock}}", products.filter(item => item.Stock < item.LimitLowStock).length)


        html = html.replace("{{categoryWiseData}}", categories.map(item => {
            return `<tr>
            <td>${item.Category}</td>
            <td> ${subCategories
                    .filter(sub => sub.Category === item.Category)
                    .map(sub => sub.SubCategory)
                    .join('<hr>')}</td>
            <td>${products.filter(pro => pro.Category === item.Category).length}</td>
            <td>${products.filter(pro => pro.Category === item.Category ? pro.Stock < pro.LimitLowStock : 0).length}</td>

            </tr>`
        }))

        html = html.replace("{{individualProductReport}}", products.map(item => {
            return `
            <div class="report-container">
      <div class="report-header">
        <h1>Product Report</h1>
        <p><strong>Product ID:</strong> ${item.DisplayId}</p>
      </div>

      <div class="report-section">
        <h2>Basic Information</h2>
        <p><strong>Title:</strong> ${item.Title}</p>
        <p><strong>Category:</strong> ${item.Category}</p>
        <p><strong>Subcategory:</strong> ${item.SubCategory}</p>
      </div>

      <div class="report-section">
        <h2>Pricing and Stock</h2>
        <table>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>Low Stock Limit</th>
          </tr>
          <tr>
            <td>$${item.Price}</td>
            <td>${item.Quantity}</td>
            <td>${item.Stock}</td>
            <td>${item.LimitLowStock}</td>
          </tr>
        </table>
        <p>
          <strong>Stock Status:</strong>
          <span class="highlight">${item.Stock < item.LimitLowStock ? "Low Stock" : "In Stock"}</span>
        </p>
      </div>

      <div class="report-section">
        <h2>Description</h2>
        <p>${item.Description}</p>
      </div>

      <div class="report-section">
        <h2>Visibility</h2>
        <p><strong>Visible:</strong> ${item.Visible}</p>
      </div>

      <div class="report-section">
        <h2>Last Updated</h2>
        <p>Updated At: ${item.updatedAt}</p>
      </div>
    </div>
            `
        }))

        return html;
    } catch (error) {
        console.log(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
}

module.exports = setDataReport;
const UserModel = require('../../../models/user.model');
const OrderModel = require('../../../models/orders.model');
const fs = require('fs');
const path = require('path');

const setPdfData = async (orderId) => {
    try {
        const order = await OrderModel.findById(orderId);

        const templatePath = path.join(__dirname, '../orderHtmlTemplate.html');
        let html = fs.readFileSync(templatePath, 'utf8');

        

        html = html.replace('{{name}}', order.UserId)
            .replace('{{email}}', order.Email)
            .replace('{{address}}', order.Address)
            .replace('{{orderId}}', order._id)
            .replace('{{date}}', order.updatedAt)
            .replace('{{payment}}', order.PaymentMethod)
            .replace('{{subtotal}}', order.Total)
            .replace('{{gst}}', order.Total * 0.18)
            .replace('{{otherCharges}}', 5.00)
            .replace('{{total}}', order.Total + order.Total * 0.18 + 5.00)

        html = html.replace('{{items}}', order.Products.map(item => {
            return `<tr>
            <td>${item.Title}</td>
            <td>${item.Quantity}</td>
            <td>${item.Price}</td>
            <td>${item.Price * item.Quantity}</td>
               </tr>`

        }));


        return html;
    } catch (error) {
        console.log(error);

    }

}


module.exports = setPdfData;
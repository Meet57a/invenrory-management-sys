const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    OrderId: {
        type: String,
        required: [true, 'OrderId is required'],
        trim: true,
    },
    UserId: {
        type: String,
        required: [true, 'UserId is required'],
        trim: true,
    },
    Products: {
        type: Array,
        required: [true, 'Products is required'],
    },
    Total: {
        type: Number,
        required: [true, 'Total is required'],
    },
    Status: {
        type: String,
        required: [true, 'Status is required'],
        trim: true,
    },
    PaymentMethod: {
        type: String,
        required: [true, 'PaymentMethod is required'],
        trim: true,
    },
    Address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    Phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
    },
    Email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
    },
    Note: {
        type: String,
        required: [true, 'Note is required'],
        trim: true,
    },  
    PaymentStatus: {
        type: String,
        required: [true, 'PaymentStatus is required'],
        trim: true,
    },
    OrederAcceptedOrNot : {
        type: String,   
        required: [true, 'OrederAcceptedOrNot is required'],
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;


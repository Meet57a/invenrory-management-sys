const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    DisplayId: {
        type: String,
        required: [true, 'ProductId is required'],
        trim: true,
    },
    Title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    Price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    Quantity: {
        type: String,
        required: [true, 'Quantity is required'],
        trim: true,
    },
    Stock: {
        type: Number,
        required: [true, 'Stock is required'],
    },
    Category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
    SubCategory: {
        type: String,
        required: [true, 'SubCategory is required'],
        trim: true,
    },
    Description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    Visible: {
        type: String,
        required: [true, 'Visible is required'],
        trim: true,
    },
    LimitLowStock: {
        type: Number,
        required: [true, 'LimitLowStock is required'],
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
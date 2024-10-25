const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        
    },
    Category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    SubCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    SubCategory: {
        type: String,
        required: [true, 'SubCategory is required'],
        trim: true,
    },
    Category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
}, { timestamps: true });

const SubCategory = mongoose.model('SubCategory', subcategorySchema);

module.exports = SubCategory;
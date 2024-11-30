    const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        lower: true,

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
const { default: mongoose } = require('mongoose');
const PUBLIC_DATA = require('../../constants');

exports.ConnectDB = async () => {
    try {
        await mongoose.connect(PUBLIC_DATA.mongoURI);
        console.log(`MongoDB Connected: ${mongoose.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        mongoose.disconnect();
        process.exit(1);
    }
};
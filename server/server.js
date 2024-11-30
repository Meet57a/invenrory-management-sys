require('dotenv').config({});
const PUBLIC_DATA = require('./constants');
const app = require('./src/app');
const { ConnectDB } = require('./src/config/db.config');
const User = require("./src/models/user.model");

ConnectDB();

const dd  = async () => {
    const user = await User.find();
    console.log(user); 
    
}

// dd()

app.listen(PUBLIC_DATA.port, () => {
    console.log(`Server is running on port http://localhost:${PUBLIC_DATA.port}`);
}); 
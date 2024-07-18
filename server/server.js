require('dotenv').config({});
const PUBLIC_DATA = require('./constants');
const app = require('./src/app');
const { ConnectDB } = require('./src/config/db.config');

ConnectDB();


app.listen(PUBLIC_DATA.port, () => {
    console.log(`Server is running on port http://localhost:${PUBLIC_DATA.port}`);
}); 
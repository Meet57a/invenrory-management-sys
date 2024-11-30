const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ApiError = require('./utils/ApiError');
const ErrorHandling = require('./middlewares/ErrorHandler');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   
app.use("/files", express.static("files"));

app.use('/api/v1', require('./routes'));

app.use("*", (req, res) => {
    throw new ApiError(404 ,"Route not found");
});

app.use(ErrorHandling);




module.exports = app;
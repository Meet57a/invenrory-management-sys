class PUBLIC_DATA {
    static port = process.env.PORT;
    static mongoURI = process.env.MONGO_URI;
}

module.exports = PUBLIC_DATA;
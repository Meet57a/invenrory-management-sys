class PUBLIC_DATA {
    static port = process.env.PORT;
    static mongoURI = process.env.MONGO_URI;
    static jwtSecret = process.env.AUTH_SECRET;
}

module.exports = PUBLIC_DATA;
class AuthValidation {
    static async RegisterUserValidation(req, res, next) {
        const { name, email, password } = req.body;
        console.log(req.body);
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (req.body != null) {
            if (!name) {
                return res.status(400).json({ message: "Name is required" });
            }
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            if (!email.match(emailFormat)) {
                return res.status(400).json({ message: "Email is not valid" });
            }
            if (password == null || password == "") {
                return res.status(400).json({ message: "Password is required" });
            }
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters" });
            }
            if(name && email && password){
                next();
            }
        }
    }

    static async LoginUser(req, res, next) {
        const { email, password } = req.body;
        if (req.body != null) {
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            if(email && password){
                next();
            }
        }
    }


}

module.exports = AuthValidation;
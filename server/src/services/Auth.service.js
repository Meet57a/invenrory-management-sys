const httpStatus = require("http-status");
const UserModel = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ProfileModel = require("../models/profile.model");
const bcrypt = require("bcrypt");
const AuthValidation = require("../validations/AuthValidation");
const { generateToken } = require("../utils/Token.utils");


class AuthService {

    static async RegisterUser(body) {
        const { name, email, password } = body;
        const checkExist = await UserModel.findOne({ email: email });



        if (checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User Already Registered")
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, salt);
        const user = await UserModel.create({ name, email, password: hashpass });

        const createToken = generateToken(user);
        const createTokenRefresh = generateToken(user, "2d");

        await ProfileModel.create({ user: user._id, refreshToken: createTokenRefresh });
        return { message: "User Registered Successfully.", token: createToken }

    }

    static async LoginUser(body) {
        const { email, password } = body;
        const checkExist = await UserModel.findOne({ email: email });
        if (!checkExist) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Credentials")
            return
        }
        const passwordMatch = await bcrypt.compare(password, checkExist.password);

        if (!passwordMatch) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Credentials")
            return
        }
        
        if(passwordMatch){
            const createToken = generateToken(checkExist);
            return { message: "User Logged In Successfully.", token: createToken }
        }
    }

    static async ProfileService(user) {
        const profile = await UserModel.findById(user.userid).select("name email");
        
        
        if (!profile) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Credentials")
            return
        }
        return { user: profile ,message : "Data fetched"}
    }
}

module.exports = AuthService;
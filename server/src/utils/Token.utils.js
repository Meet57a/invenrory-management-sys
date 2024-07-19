const jwt = require('jsonwebtoken')
const PUBLIC_DATA = require('../../constants')

exports.generateToken = (user,expire = "1d") => {
    return jwt.sign({userid:user._id},PUBLIC_DATA.jwtSecret,{expiresIn:expire})
}

exports.verifyToken = (token) => {
    
    return jwt.verify(token,PUBLIC_DATA.jwtSecret)
}
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

const generateToken = (email) =>{
    return jwt.sign({ email: email }, process.env.TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
}

const generateRefreshToken = (email) =>{
    return jwt.sign({ email: email }, process.env.TOKEN_SECRET_REFRESH, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })
}


module.exports = {
    generateToken, 
    generateRefreshToken
}
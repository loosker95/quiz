const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const user = require('../models/user.model')
const Token = require('../models/refreshToken.model');

const tokenVerify = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(403).send({ auth: false, message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        req.user = user
        next()
    })

}

const authRefreshToken = async (req, res, next) => {
    const allTokens = await Token.getUserRetfreshToken(req.user.id)
    const refreshToken = allTokens.map(function (i) { return i.refresh_token; });

    if (refreshToken == null) return res.status(401).send({ auth: false, message: 'Failed to authenticate R. token.' });
    if (!refreshToken) return res.status(403).send({ auth: false, message: 'Unauthorized' });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_EXPIRE_TIME, (error, user) => {
        if (error) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.!!!' });
        req.user = user
        next()

    })

}

const authRole = ((role) => {
    return async (req, res, next) => {
        const data = await user.findOne({ where: { email: req.user.email } })
        if (data.roles !== role) {
            return res.status(401).send({ auth: false, message: 'Not allowed' });
        }
        next()
    }
})



module.exports =
{
    tokenVerify,
    authRefreshToken,
    authRole
}
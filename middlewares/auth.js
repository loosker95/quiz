const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const user = require('../models/user.model')


const tokenVerify = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(403).send({ auth: false, message: 'Forbidden' });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        req.user = user
        next()
    })
}


const authRole = ((role) => {
    return async (req, res, next) => {
        const data = await user.findOne({ where: { email: req.user.email } })
        if(!data){
            return res.status(403).send({ auth: false, message: 'Forbidden' });
        }
        if (!role.includes(data.roles)) {
            return res.status(401).send({ auth: false, message: 'You are not allowed to do this action!' });
        }
        next()
    }
})


module.exports =
{
    tokenVerify,
    authRole
}
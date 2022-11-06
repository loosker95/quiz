const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const user = require('../models/user.model')

function tokenVerify(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).send({ auth: false, message: 'Unauthorized'});
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if(error) 
        return res.status(403).send({ auth: false, message: 'Failed to authenticate token.'});
        req.user = user
        next()
    })
}

const authRole = ((role) =>{
    return async (req, res, next) =>{   
        const data = await user.findOne({where: {email: req.user.id}})
        if(data.is_admin !== role){
            return res.status(401).send({ auth: false, message: 'Not allowed'});
        }
        next()
    }
})

module.exports = 
{
    tokenVerify,
    authRole
}
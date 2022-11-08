const Joi = require('joi')

const createRefreshToken = {
    body: Joi.object().keys({
        user_id: Joi.string().required(),
        refresh_token: Joi.string().required(),
    }),
};



module.exports = {
    createRefreshToken,
};


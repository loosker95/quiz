const Token = require('../models/token.model')

module.exports = {
    addToken: ( async(req, res) =>{
        const { user_id, token, refresh_token} = req.body;
        const date = new Date();
        const newToken = {  user_id, token, refresh_token, expiration_date: date, created_at: date, updated_at: date }
        try {
            const data = await Token.create(newToken);
            res.json({ statusCode: 200, message: "Token added successfully", data: { tokens: data } })
        } catch (error) {
            res.json({ Error: error.message })
        }
    })
}
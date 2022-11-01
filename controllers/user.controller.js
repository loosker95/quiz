const User = require('../models/user.model');



module.exports = {
    userCreate: ((req, res) =>{
        res.end('Hello from controller...')
    }),

    getAllUsers:  (async (req, res) => {
        console.log(User())
        // res.end('ok');
        // const response = await User().findAll({});
        // res.status(200).send(response.rows);
    })
}
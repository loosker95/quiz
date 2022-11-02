const Answer = require('../models/answer.model');


module.exports = {

    addAnswer: ( async(req, res) =>{
        const { answers, question_id, is_correct, image } = req.body;
        const newAnswer = { answers, question_id, is_correct, image }
        try {
            const data = await Answer.create(newAnswer);
            res.json({ statusCode: 200, message: "Answer successfully added", data: { answers: data } })
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    getAllAnswers: ( async(req, res) => {
        try {
            const data = await Answer.findAll({});
            if (Object.keys(data).length !== 0) {
                res.json({ statusCode: 200, data: { answers: data } })
            } else {
                res.json({ statusCode: 200, message: "Empty...No Data available!" })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    findAnswer: ( async(req, res) =>{
        try {
            const data = await Answer.findOne({ where: { id: req.params.id } })
            if (data) {
                res.json({ statusCode: 200, data: { answers: data } })
            } else {
                res.json({ statusCode: 200, message: 'Answer doesn\'t exist' })
            }
        } catch (error) {
            res.json({ Error: error.message })
        } 
    }), 

    updateAnswer: ( async(req, res) =>{
        const { answers, is_correct, image } = req.body;
        const updateAns = { answers, is_correct, image, updated_at: new Date()}
        try {
            await Answer.update(updateAns, { where: { id: req.params.id } })
            res.json({ statusCode: 200, message: "Answer successfully updated" })
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    deleteAnswer: ( async(req, res) =>{
        try {
            const data = await Answer.destroy({ where: { id: req.params.id } })
            if (data) {
                res.json({ statusCode: 200, message: 'Answer successfully deleted' })
            } else {
                res.json({ statusCode: 200, message: 'Answer doesn\'t exist' })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    })
    
}
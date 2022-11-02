const Result = require('../models/result.model');

module.exports = {

    addResult: ( async (req, res) =>{
        const { user_id, question_id, answer_selected, score } = req.body;
        const newResult = { user_id, question_id, answer_selected, score }
        try {
            const data = await Result.create(newResult);
            res.json({ statusCode: 200, message: "Result successfully added", data: { results: data } })
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    getAllResult: ( async(req, res) =>{
        try {
            const data = await Result.findAll({});
            if (Object.keys(data).length !== 0) {
                res.json({ statusCode: 200, data: { results: data } })
            } else {
                res.json({ statusCode: 200, message: "Empty...No Data available!" })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    findResult: (async (req, res) =>{
        try {
            const data = await Result.findOne({ where: { id: req.params.id } })
            if (data) {
                res.json({ statusCode: 200, data: { results: data } })
            } else {
                res.json({ statusCode: 200, message: 'Result doesn\'t exist' })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    updateResult: ( async(req, res) =>{
        const { user_id, question_id, answer_selected, score } = req.body;
        const updateRlt = { user_id, question_id, answer_selected, score, updated_at: new Date()}
        try {
            await Result.update(updateRlt, { where: { id: req.params.id } })
            res.json({ statusCode: 200, message: "Result successfully updated" })
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    deleteResult: ( async(req, res) =>{
        try {
            const data = await Result.destroy({ where: { id: req.params.id } })
            if (data) {
                res.json({ statusCode: 200, message: 'Result successfully deleted' })
            } else {
                res.json({ statusCode: 200, message: 'Result doesn\'t exist' })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    viewResult: ( async(req, res) =>{
        try {
            const data = await Result.findOne({ where: { user_id: req.params.id } });
            if (Object.keys(data).length !== 0) {
                res.json({ statusCode: 200, data: { results: data } })
            } else {
                res.json({ statusCode: 200, message: "Empty...No Data available!" })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    })

}

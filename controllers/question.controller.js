const Question =  require('../models/question.model')


module.exports = {

    addQuestion: ( async(req, res) =>{
        const {question, image} = req.body
        const newQuestion = {question, image}
        try{
            const data = await Question.create(newQuestion)
            res.json({ statusCode: 200, message: "Question successfully added", data: { questions: data } })
        }catch (error) {
            res.json({ Error: error.message })
        }
    }),

    allQuestions: ( async(req, res) =>{
        try{
            const data = await Question.findAll({})
            if (Object.keys(data).length !== 0) {
                res.json({ statusCode: 200, data: { questions: data } })
            }else{
                res.json({ statusCode: 200, message: "Empty...No Data available!" })
            }
        }catch (error) {
            res.json({ Error: error.message })
        }
    }),

    findQuestion: ( async(req, res) =>{
        try{
            const data = await Question.findByPk(req.params.id);
            if (data) {
                res.json({ statusCode: 200, data: { questions: data } })
            } else {
                res.json({ statusCode: 200, message: 'Question doesn\'t exist' })
            }
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    updateQuestion: (async (req, res) =>{
        const { question, image } = req.body;
        const updateQus = { question, image, updated_at: new Date()}
        try {
            await Question.update(updateQus, { where: { id: req.params.id } })
            res.json({ statusCode: 200, message: "Question successfully update" })
        } catch (error) {
            res.json({ Error: error.message })
        }
    }),

    deleteQuestion: (async (req, res) =>{
        try {
            const data = await Question.destroy({ where: { id: req.params.id } })
            if (data) {
                res.json({ statusCode: 200, message: 'Question successfully deleted' })
            } else {
                res.json({ statusCode: 200, message: 'Question doesn\'t exist' })
            }
        } catch (error) {
            res.json({ Error: error.message })
        } 
    })

}
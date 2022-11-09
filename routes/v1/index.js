const express = require('express')
const userRoute = require('./user.route')
const questionRoute = require('./question.route')
const answerRoute = require('./answer.route')
const resultRoute = require('./result.route')
const authRoute = require('./auth.route')

const router = express.Router()

const allRoutes = [
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/questions',
        route: questionRoute
    },
    {
        path: '/answers',
        route: answerRoute       
    },
    {
        path: '/results',
        route: resultRoute
    },
    {
        path: '/auth',
        route: authRoute  
    }
]

allRoutes.forEach((item) =>{
    router.use(item.path, item.route) 
})

module.exports =  router
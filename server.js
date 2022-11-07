const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./models/connect')
const bodyParser = require('body-parser')
const userRoute = require('./routes/v1/user.route')
const questionRoute = require('./routes/v1/question.route')
const answerRoute = require('./routes/v1/answer.route')
const resultRoute = require('./routes/v1/result.route')
const authRoute = require('./routes/v1/auth.route')
const ApiError = require('./utils/ApiError')
const httpStatus = require('http-status')

const { errorConverter, errorHandler} = require('./middlewares/error');


const app = express()
dotenv.config({path: './config.env'})
port = process.env.PORT || 1010

connectDb();


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1', userRoute)
app.use('/api/v1/questions', questionRoute)
app.use('/api/v1/answers', answerRoute)
app.use('/api/v1/results', resultRoute)
app.use('/v1/auth', authRoute)
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}/v1`)
})



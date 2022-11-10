const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./models/connect')
const bodyParser = require('body-parser')
const ApiError = require('./utils/ApiError')
const httpStatus = require('http-status')
const { errorConverter, errorHandler} = require('./middlewares/error');
const routes = require('./routes/v1')

const app = express()
dotenv.config({path: './config.env'})
port = process.env.PORT || 1010

connectDb();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes)


app.use(( err, req, res, next ) => {
    res.locals.error = err;
    if (err.status >= 100 && err.status < 600)
    {res.status(err.status);}
      res.status(500);
      next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    });

app.use(errorConverter);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}/v1`)
})



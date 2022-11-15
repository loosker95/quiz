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

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes)


app.use((req, res, next ) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}/v1`)
})



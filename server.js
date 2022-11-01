const express = require('express')
const app = express()
const dotenv = require('dotenv')
const userRoute = require('./routes/v1/user.route')
const connectDb = require('./models/connect')
const bodyParser = require('body-parser')

dotenv.config({path: './config.env'})
port = process.env.PORT || 1010

connectDb();


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/v1', userRoute)

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}/v1`)
})
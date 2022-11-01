const express = require('express')
const app = express()
const dotenv = require('dotenv')
const userRoute = require('./routes/v1/user.route')
const connectDb = require('./models/connect')

dotenv.config({path: './config.env'})
port = process.env.PORT || 1010
app.use(express.json())
connectDb();

app.use('/v1', userRoute)

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}/v1`)
})
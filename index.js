//import dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();

//initalize express
const app = express()

//initalize port
const PORT = process.env.SERVER_PORT || 5002;

//initalize middleware
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :response-time'))

//MonogoDB connect
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(console.log("Connected to MongoDB")).catch((err)=>{console.log(err)})

//import routes
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const bookingRouter = require('./routes/booking')

//initalize routes
app.use("api/v2/users", userRouter)
app.use("api/v2/admin", adminRouter)
app.use*("api/v2/booking", bookingRouter)

//app listening
app.listen(PORT, ()=>{console.log(`Server running at ${PORT}`)})
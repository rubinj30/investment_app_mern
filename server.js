require("dotenv").config()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()

// ====== DB SETUP =========
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

const connection = mongoose.connection
connection.on('connected', () => {
    console.log('Mongoose Connected Successfully')
})

// If the connection throws an error
connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err)
})

app.use(express.static(__dirname + '/client/build/'))


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const UsersController = require('./routes/users')
app.use('/api/users', UsersController)
const InvestmentsController = require('./routes/investments')
app.use('/api/users/:userId/investments', InvestmentsController)

app.get('*', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// test
app.use(logger('dev'))
app.use(bodyParser.json({ extended: false }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Magic happening on port " + PORT)
})
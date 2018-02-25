const mongoose = require('mongoose')
const Schema = require('../schema')

const User = mongoose.model('User', Schema.UserSchema)

module.exports = User
const mongoose = require('mongoose')
const Schema = require('../schema')

const Investment = mongoose.model('Investment', Schema.InvestmentSchema)

module.exports = Investment
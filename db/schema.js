const mongoose = require('mongoose')
const Schema = mongoose.Schema

console.log("hello from schema")
mongoose.Promise = global.Promise

const InvestmentSchema = new Schema(
    {
        ticker: String,
        name: String,
        quantity: Number,
        price: Number,
        type: String
    },
    {
        timestamps: {}
    }
)

const UserSchema = new Schema(
    {
        username: String,
        email: String,
        age: String
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

module.exports = {
    UserSchema,
    PlantSchema
}

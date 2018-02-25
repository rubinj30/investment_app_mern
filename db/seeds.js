require('dotenv').config()

const Investment = require('./models/Investment')
const User = require('./models/User')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
    console.log('CONNECTED TO MONGO')
})

User.remove({}).then(() => {
    const lostCorner = new Garden({
        username: 'ScroogeMcDuck',
        email: 'scrooge@mcduck.com',
        age: '56',
        state: 'GA'
    })
    // seed User
    const martha = new User({
        firstName: 'Martha' ,
        lastName: 'Stewart',
        email: 'martha@gmail.com',
        share: true
    })
    // seed Plants
    const kale = new Plant({
        name: 'Kale',
        sunlightNeeded: 'Average',
        quantity: 3
    })
    const squash = new Plant({
        name: 'Squash',
        sunlightNeeded:'Average',
        quantity: 5
    })
    const pepper = new Plant({
        name: 'Pepper',
        sunlightNeeded:'Average',
        quantity: 2
    })
    const greenBean = new Plant({
        name: 'Green Bean',
        sunlightNeeded:'Average',
        quantity: 5
    })
    martha.plants.push(kale, squash, pepper, greenBean)
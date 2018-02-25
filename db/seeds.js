require('dotenv').config()

const Investment = require('./models/Investment')
const User = require('./models/User')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
    console.log('CONNECTED TO MONGO')
})

User.remove({}).then(() => {
    const user1 = new User({
        username: 'ScroogeMcDuck',
        email: 'scrooge@mcduck.com',
        age: '56'
    })
    const amzn = new Investment({
        ticker: 'AMZN' ,
        category: 'stock',
        quantity: 10
    })
    const fb = new Investment({
        ticker: 'fb' ,
        category: 'stock',
        quantity: 6
    })
    const hd = new Investment({
        ticker: 'HD' ,
        category: 'stock',
        quantity: 8
    })
    const ltc = new Investment({
        ticker: 'ltc',
        category: 'cryptocurrency',
        quantity: 12
    })
    const eth = new Investment({
        ticker: 'eth',
        category: 'cryptocurrency',
        quantity: 3
    })
    const tsla = new Investment({
        ticker: 'tsla',
        category: 'stock',
        quantity: 0
    })
    user1.investments.push(amzn, fb, hd, ltc, eth, tsla)
    return user1.save()
}).then(() => {
    const user2 = new User({
        username: 'warren_buffett',
        email: 'warren@berkshire.com',
        age: '60'
    })
    const amzn = new Investment({
        ticker: 'AMZN' ,
        category: 'stock',
        quantity: 5
    })
    const fb = new Investment({
        ticker: 'fb' ,
        category: 'stock',
        quantity: 6
    })
    const doge = new Investment({
        ticker: 'DOGE' ,
        category: 'cryptocurrency',
        quantity: 24
    })
    const jnj = new Investment({
        ticker: 'jnj' ,
        category: 'stock',
        quantity: 20
    })
    const snap = new Investment({
        ticker: 'SNAP' ,
        category: 'stock',
        quantity: 0
    })
    user2.investments.push(amzn, fb, doge, jnj, snap)
    return user2.save()
}).catch((err) => {
    console.log(`*** ERROR SEEDING DATA ${err}`)
}).then(() => {
    mongoose.connection.close()
    console.log(`
    Finished seeding the database
    
    Disconnected from Mongo DB`)
})

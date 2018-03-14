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
        age: '56',
    })
    const amzn = new Investment({
        ticker: 'AMZN' ,
        type: 'stock',
        quantity: 4,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 1012.43
    })
    const fb = new Investment({
        ticker: 'FB' ,
        type: 'stock',
        quantity: 23,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 197.24
    })
    const hd = new Investment({
        ticker: 'HD' ,
        type: 'stock',
        quantity: 20,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 120.32
    })
    const tsla = new Investment({
        ticker: 'TSLA',
        type: 'stock',
        quantity: 14,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 370.12
    })
    const dal = new Investment({
        ticker: 'DAL',
        type: 'stock',
        quantity: 132,
        price: 0,
        totalPurchasePrice: 133,
        stockPurchasePrice: 45.32
    })

    const twlo = new Investment({
        ticker: 'TWLO',
        type: 'stock',
        quantity: 100,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 39.59
    })

    const ua = new Investment({
        ticker: 'UA',
        type: 'stock',
        quantity: 87,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 33.59
    })


    user1.investments.push(amzn, fb, hd,  tsla, dal, twlo, ua)
    return user1.save()
}).then(() => {
    const user2 = new User({
        username: 'warren_buffett',
        email: 'warren@berkshire.com',
        age: '60'
    })
    const amzn = new Investment({
        ticker: 'AMZN' ,
        type: 'stock',
        quantity: 6,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 920.43
    })
    const fb = new Investment({
        ticker: 'FB' ,
        type: 'stock',
        quantity: 20,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 125.12,
    })
    const jnj = new Investment({
        ticker: 'JNJ' ,
        type: 'stock',
        quantity: 20,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 103.42
    })
    
    const nke = new Investment({
        ticker: 'NKE' ,
        type: 'stock',
        quantity: 40,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 104.44
    })
    const ibm = new Investment({
        ticker: 'IBM',
        type: 'stock',
        quantity: 15,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 197.23
    })
    const ddd = new Investment({
        ticker: 'DDD',
        type: 'stock',
        quantity: 150,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 16.59
    })

    user2.investments.push(amzn, fb, jnj, nke, ibm, ddd)
    return user2.save()
}).catch((err) => {
    console.log(`*** ERROR SEEDING DATA ${err}`)
}).then(() => {
    mongoose.connection.close()
    console.log(`
    Finished seeding the database
    
    Disconnected from Mongo DB`)
})

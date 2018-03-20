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
        stockPurchasePrice: 1012.43,
        totalPurchasePrice: 4049.72
    })
    const fb = new Investment({
        ticker: 'FB' ,
        type: 'stock',
        quantity: 23,
        price: 0,
        stockPurchasePrice: 197.24,
        totalPurchasePrice: 4536.52
    })
    const hd = new Investment({
        ticker: 'HD' ,
        type: 'stock',
        quantity: 20,
        price: 0,
        stockPurchasePrice: 120.32,
        totalPurchasePrice: 2406.4
    })
    const tsla = new Investment({
        ticker: 'TSLA',
        type: 'stock',
        quantity: 14,
        price: 0,
        stockPurchasePrice: 370.12,
        totalPurchasePrice: 5181.68
    })
    const dal = new Investment({
        ticker: 'DAL',
        type: 'stock',
        quantity: 132,
        price: 0,
        stockPurchasePrice: 45.32,
        totalPurchasePrice: 5982.24
    })

    const twlo = new Investment({
        ticker: 'TWLO',
        type: 'stock',
        quantity: 100,
        price: 0,
        stockPurchasePrice: 39.59,
        totalPurchasePrice: 3959
    })

    const ua = new Investment({
        ticker: 'UA',
        type: 'stock',
        quantity: 87,
        price: 0,
        stockPurchasePrice: 33.59,
        totalPurchasePrice: 2922.33
    })

    const luv = new Investment({
        ticker: 'LUV',
        type: 'stock',
        quantity: 150,
        price: 0,
        stockPurchasePrice: 38.59,
        totalPurchasePrice: 5788.5
    })


    user1.investments.push(amzn, fb, hd,  tsla, dal, twlo, ua, luv)
    return user1.save()
}).then(() => {
    const user2 = new User({
        username: 'warren_buffett',
        email: 'warren@berkshire.com',
        age: '60'
    })
    const amzn = new Investment({
        ticker: 'AMZN',
        type: 'stock',
        quantity: 5,
        price: 0,
        stockPurchasePrice: 920.43,
        totalPurchasePrice: 4602.15
    })
    const fb = new Investment({
        ticker: 'FB',
        type: 'stock',
        quantity: 20,
        price: 0,
        stockPurchasePrice: 125.12,
        totalPurchasePrice: 2502.4
    })
    const jnj = new Investment({
        ticker: 'JNJ',
        type: 'stock',
        quantity: 20,
        price: 0,
        stockPurchasePrice: 103.42,
        totalPurchasePrice: 2068.4
    })
    
    const nke = new Investment({
        ticker: 'NKE',
        type: 'stock',
        quantity: 40,
        price: 0,
        stockPurchasePrice: 104.44,
        totalPurchasePrice: 4177.6
    })
    const ibm = new Investment({
        ticker: 'IBM',
        type: 'stock',
        quantity: 15,
        price: 0,
        stockPurchasePrice: 197.23,
        totalPurchasePrice: 2958.45
    })
    const ddd = new Investment({
        ticker: 'DDD',
        type: 'stock',
        quantity: 150,
        price: 0,
        stockPurchasePrice: 16.59,
        totalPurchasePrice: 2488.50
    })

    const mcd = new Investment({
        ticker: 'MCD',
        type: 'stock',
        quantity: 40,
        price: 0,
        stockPurchasePrice: 135.59,
        totalPurchasePrice: 5423.6
    })

    user2.investments.push(amzn, fb, jnj, nke, ibm, ddd, mcd)
    return user2.save()
}).catch((err) => {
    console.log(`*** ERROR SEEDING DATA ${err}`)
}).then(() => {
    mongoose.connection.close()
    console.log(`
    Finished seeding the database
    
    Disconnected from Mongo DB`)
})

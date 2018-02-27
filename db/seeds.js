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
        quantity: 10,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 320
    })
    const fb = new Investment({
        ticker: 'FB' ,
        type: 'stock',
        quantity: 23,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 97.24
        
    })
    const hd = new Investment({
        ticker: 'HD' ,
        type: 'stock',
        quantity: 8,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 153.32
    })
    // const ltc = new Investment({
    //     ticker: 'LTC',
    //     type: 'cryptocurrency',
    //     quantity: 12
    // })
    // const eth = new Investment({
    //     ticker: 'ETH',
    //     type: 'cryptocurrency',
    //     quantity: 3
    // })
    const tsla = new Investment({
        ticker: 'TSLA',
        type: 'stock',
        quantity: 14,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 342.12
    })
    const dal = new Investment({
        ticker: 'DAL',
        type: 'stock',
        quantity: 1020,
        price: 0,
        totalPurchasePrice: 1333,
        stockPurchasePrice: 45.32
    })
    const ll = new Investment({
        ticker: 'LL',
        type: 'stock',
        quantity: 700,
        price: 0,
        totalPurchasePrice: 12551,
        stockPurchasePrice: 17.93
    })
    const twlo = new Investment({
        ticker: 'TWLO',
        type: 'stock',
        quantity: 100,
        price: 0,
        totalPurchasePrice: 28.33,
        stockPurchasePrice: 2833.00
    })

    user1.investments.push(amzn, fb, hd,  tsla, dal, ll, twlo)
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
        quantity: 5,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 320.43
    })
    const fb = new Investment({
        ticker: 'FB' ,
        type: 'stock',
        quantity: 6,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 140.12
    })
    // const doge = new Investment({
    //     ticker: 'DOGE' ,
    //     type: 'cryptocurrency',
    //     quantity: 24
    // })
    const jnj = new Investment({
        ticker: 'JNJ' ,
        type: 'stock',
        quantity: 20,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 132.42
    })
    const nke = new Investment({
        ticker: 'NKE' ,
        type: 'stock',
        quantity: 40,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 78.44
    })
    const ibm = new Investment({
        ticker: 'IBM',
        type: 'stock',
        quantity: 12,
        price: 0,
        totalPurchasePrice: 0,
        stockPurchasePrice: 194.23
    })
    user2.investments.push(amzn, fb, jnj, nke, ibm)
    return user2.save()
}).catch((err) => {
    console.log(`*** ERROR SEEDING DATA ${err}`)
}).then(() => {
    mongoose.connection.close()
    console.log(`
    Finished seeding the database
    
    Disconnected from Mongo DB`)
})

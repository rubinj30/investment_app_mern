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
        price: 0
    })
    const amzn = new Investment({
        ticker: 'AMZN' ,
        type: 'stock',
        quantity: 10,
        price: 0
    })
    const fb = new Investment({
        ticker: 'FB' ,
        type: 'stock',
        quantity: 6,
        price: 0
    })
    const hd = new Investment({
        ticker: 'HD' ,
        type: 'stock',
        quantity: 8,
        price: 0
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
        quantity: 0,
        price: 0
    })
    const dal = new Investment({
        ticker: 'DAL',
        type: 'stock',
        quantity: 1020,
        price: 0
    })
    const ll = new Investment({
        ticker: 'LL',
        type: 'stock',
        quantity: 2000,
        price: 0
    })

    user1.investments.push(amzn, fb, hd,  tsla, dal, ll)
    return user1.save()
}).then(() => {
    const user2 = new User({
        username: 'warren_buffett',
        email: 'warren@berkshire.com',
        age: '60',
        price: 0
    })
    const amzn = new Investment({
        ticker: 'AMZN' ,
        type: 'stock',
        quantity: 5,
        price: 0
    })
    const fb = new Investment({
        ticker: 'FB' ,
        type: 'stock',
        quantity: 6,
        price: 0
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
        price: 0
    })
    const snap = new Investment({
        ticker: 'SNAP' ,
        type: 'stock',
        quantity: 0,
        price: 0
    })
    user2.investments.push(amzn, fb, jnj, snap)
    return user2.save()
}).catch((err) => {
    console.log(`*** ERROR SEEDING DATA ${err}`)
}).then(() => {
    mongoose.connection.close()
    console.log(`
    Finished seeding the database
    
    Disconnected from Mongo DB`)
})

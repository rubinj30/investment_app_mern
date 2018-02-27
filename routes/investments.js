const express = require('express')
const User = require('../db/models/User')
const Investment = require('../db/models/Investment')
const alpha = require('alphavantage')({ key: `${process.env.TIME_SERIES}`});
const router = express.Router({ mergeParams: true })

router.get('/', async (request, response) => {
    try {
        const user = await User.findById(request.params.userId)
        const tickers = user.investments.map((investment) => {
            return investment.ticker
        })
        
        const currentPrices = []
        await alpha.data.batch(tickers).then(data => {
            // console.log(data)
            for (let i=0; i < tickers.length; i++) {
                currentPrices.push(
                    {stockTicker: data['Stock Quotes'][i]['1. symbol'],
                    stockPrice: data['Stock Quotes'][i]['2. price']}
                )
            }
        });

        updatedStockInfo = []
        let portfolioTotal = 0
        user.investments.forEach((investment, index) => {
            currentPrices.map((currentPrice) => {
                if (currentPrice.stockTicker === investment.ticker) {
                    investment.price = currentPrice.stockPrice
                    investment.total = (investment.price * investment.quantity).toFixed(2)
                    portfolioTotal += investment.total
                    updatedStockInfo.push(investment)
                }
            })
        })

        response.json({
            updatedStockInfo,
            user,
            portfolioTotal
        })
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/:investmentId', async (request, response) => {
    try {
        const user = await User.findById(request.params.userId)
        const investment = await user.investments.id(request.params.investmentId)
        response.json({
            user,
            investment
        })
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/', async (request, response) => {
    try {
        const investment = {}
        investment.ticker = request.body.ticker.toUpperCase()
        investment.quantity = request.body.quantity
        investment.type = request.body.type
        newInvestment = await Investment.create(investment)
        const user = await User.findById(request.params.userId)
        user.investments.push(newInvestment)
        await user.save()
        response.json(newInvestment)
    }
    catch (err) {
        console.log(err)
    }
})

router.delete('/:investmentId', async (request, response) => {
    try {
        const user = await User.findById(request.params.userId)
        user.investments.id(request.params.investmentId).remove()
        await user.save()
        response.json(user)
    }
    catch (err) {
        console.log(err)
    }
})

router.patch('/:investmentId', async (request, response) => {
    try {
        const user = await User.findById(request.params.userId)
        const investment = await user.investments.id(request.params.investmentId)
        investment = request.body
        await investment.save()
        response.json(investment)
    }
    catch (err) {
        console.log(err)
        response.sendStatus(500) 

    }
})
module.exports = router

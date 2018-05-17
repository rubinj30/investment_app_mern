const express = require('express')
const User = require('../db/models/User')
const Investment = require('../db/models/Investment')
const alpha = require('alphavantage')({ key: `${process.env.TIME_SERIES}` });
const router = express.Router({ mergeParams: true })
const axios = require('axios')

router.get('/', async (request, response) => {
    try {
        const user = await User.findById(request.params.userId)
        const tickers = await user.investments.map((investment) => {
            return investment.ticker
        })
        
        const currentPrices = []
        const tickersString = tickers.join(",")
        const api_key = process.env.TIME_SERIES
        const data = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickersString}&types=quote`)
        console.log(data.data);
        pricesArray = data.data['Stock Quotes']
        
        for (let i = 0; i < tickers.length; i++) {
            currentPrices.push(
                {
                    stockTicker: pricesArray[i]['symbol'],
                    stockPrice: pricesArray[i]['latestPrice']
                }
            )
        }
        
        const updatedStockInfo = []
        let portfolioTotal = 0
        let portfolioCost = 0
        let profitOrLoss = 0
        console.log(user.investments)
        user.investments.forEach((investment, index) => {
            currentPrices.map((currentPrice) => {
                if (currentPrice.stockTicker === investment.ticker) {
                    
                    // sets current price of individual investment
                    investment.price = currentPrice.stockPrice
                    // calculates total value of individual investment
                    
                    investment.total = (investment.price * investment.quantity).toFixed(2)

                    // calculate individual stocks total profit
                    investment.profit = investment.total - (investment.stockPurchasePrice * investment.quantity)

                    // adds that total value to the portfolio total
                    portfolioTotal += investment.total

                    // multiplies original stock purchase price * quantity and adds to portfolio cost
                    portfolioCost += (investment.stockPurchasePrice * investment.quantity)

                    updatedStockInfo.push(investment)
                }
            })
        })

        profitOrLoss = portfolioTotal - portfolioCost
        let profitLossColor = ''
        profitOrLoss >= 0 ? profitLossColor = 'green' : profitLossColor = '#F03434'
        response.json({
            updatedStockInfo,
            user,
            portfolioTotal,
            portfolioCost,
            profitLossColor
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
        const data = await axios.get(`https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${investment.ticker}&apikey=J2JY3QVFS2WGX91L`)
        investment.price = data.data['Stock Quotes'][0]['2. price']

        let profitLossColor = ''
        investment.price - investment.stockPurchasePrice >= 0 ? profitLossColor = 'green' : profitLossColor = 'red;'

        response.json({
            user,
            investment,
            profitLossColor
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
        await alpha.data.batch(investment.ticker).then(data => {

            investment.stockPurchasePrice = data['Stock Quotes'][0]['2. price']
            console.log(investment)
        });

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
        investment.quantity = request.body.quantity
        await user.save()
        response.json(investment)
    }
    catch (err) {
        console.log(err)
        response.sendStatus(500)
    }
})

module.exports = router

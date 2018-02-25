const express = require('express')
const User = require('../db/models/User')
const Investment = require('../db/models/Investment')

const router = express.Router({ mergeParams: true })

router.get('/', async (request, response) => {
    try {
        const user = await User.findById(request.params.userId)
        response.json(user)
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
        await Investment.findByIdAndRemove(request.params.investmentId)
        response.send('completed delete')
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

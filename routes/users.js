const express = require('express')
const User = require('../db/models/User')

const router = express.Router()

router.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        response.json(users)
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/:userId', async (request, response) => {
    try {
        const user = await User.findById(request.params.userId)
        response.json(user)
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/', async (request, response) => {
    try {
        const newUserInfo = await request.body
        const newUser = await User.create(newUserInfo)
        await newUser.save()
        response.json(newUser)
    }
    catch (err) {
        console.log(err)
    }
})

router.delete('/:userId', async (request, response) => {
    try {
        await User.findByIdAndRemove(request.params.userId)
        response.send('completed delete')
    }
    catch (err) {
        console.log(err)
    }
})

router.patch('/:userId', async (request, response) => {
    try {
        const updatedUserInfo = await User.findByIdAndUpdate(request.params.userId, request.body, {new: true})
        response.json(updatedUserInfo)
    }
    catch (err) {
        console.log(err)
        response.sendStatus(500) 

    }
})
module.exports = router

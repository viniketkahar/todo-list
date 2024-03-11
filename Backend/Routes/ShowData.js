const express = require('express')
const Todo = require('../Models/TodoSchema')
const router = express.Router()

router.post("/showdata", async (req, res) => {
    try {
        let items = await Todo.find({})
        res.send([items])
    } catch (error) {
        res.send("Error", error.message)
    }
})

module.exports = router
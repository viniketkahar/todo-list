const express = require('express')
const router = express.Router()
const Data = require("../Models/TodoSchema")
const { body, validationResult } = require("express-validator")

router.post("/adddata", [
    body("title", "Title cannot be empty.").notEmpty(),
    body("desc", "Description cannot be empty").notEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsArr: errors.array() });
    }
    else {
        try {
            await Data.create({
                title: req.body.title,
                desc: req.body.desc
            })

            res.json({ success: true })
        }
        catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    }
})

module.exports = router
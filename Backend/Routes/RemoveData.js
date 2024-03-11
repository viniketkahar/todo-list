const express = require("express")
const router = express.Router();
const Data = require("../Models/TodoSchema");

router.delete("/deletedata/:id", async (req, res) => {
    try {
        const todo = await Data.findById(req.params.id);
        if (!todo)
            return res.status(404).json({
                success: false, message: "invalid id"
            })
        await todo.deleteOne();
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false })
        console.log(error)
    }
})

module.exports = router
const mongoose = require('mongoose')
const { Schema } = mongoose

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('TodoItems',TodoSchema)
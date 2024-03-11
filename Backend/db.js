const mongoose = require('mongoose')
const mongoUri = 'mongodb+srv://viniketkahar:Viniket40354@cluster0.n91h8d0.mongodb.net/Todo?retryWrites=true&w=majority'

const mongoDB = async () => {
    mongoose.connect(mongoUri, { useNewUrlParser: true }, async (err, result) => {
        if (err) {
            console.log('------', err)
        }
        else {
            console.log('connected');
            const fetched_data = await mongoose.connection.db.collection('todoitems')
            fetched_data.find({}).toArray(function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    // console.log(data)  
                    global.todoItems = data;
                }
            })
        }
    })
}

module.exports = mongoDB;
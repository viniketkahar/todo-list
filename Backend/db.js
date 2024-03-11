const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_LINK 

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
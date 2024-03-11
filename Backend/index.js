require('dotenv').config();
const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000
const mongoDB = require("./db")
app.use(cors())
mongoDB();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json())
app.use('/api', require("./Routes/AddData"))
app.use('/api', require("./Routes/ShowData"))
app.use('/api', require("./Routes/RemoveData"))

app.get("/", (req, res) => {
    res.send("Hello World!!!")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 
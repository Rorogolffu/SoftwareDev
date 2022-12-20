const express = require('express')
const app = express()
const worker = require('./model/worker.js')

app.get('/', (req, res) => {
    res.send("สวัสดีคนโง่")
})

app.get('/workshop2', function(req, res){
    res.sendFile(__dirname + '/Html/workshop2/ws2.html')
})

app.get('/about', (req, res) => {
    res.send(worker.Hello())
})

app.get('*', function(req, res){
    res.sendFile(__dirname + '/model/Error.html')
})

app.listen(3000, () => {
    console.log("Start Server at Port [3000]")
})


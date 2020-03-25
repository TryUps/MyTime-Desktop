const express = require('express')
const path = require('path')
const app = express()

app.use('../app/', (req, res) => {
    res.send('server now listing')
})

app.use('/public', express.static(__dirname, '/../src'))
app.use('/public', serveIndex(__dirname, '/../src'))

const listen = app.listen(47156, () => console.log('server now running!'))

module.exports = listen
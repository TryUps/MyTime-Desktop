const { protocol } = require('electron')
const fs = require('fs')
const path = require('path')
const url = require('url')

protocol.registerFileProtocol(PROTOCOL,(request, callback) => {
    let uri = request.url.substr(PROTOCOL.length + 3)
    uri = path.join(__dirname,FOLDER,uri)
    if (uri) {
        callback({ path:uri })
    }else {
        callback({ error: -324 })
    }
}, (error) => {
    if (error) console.error('Failed to register protocol')
})
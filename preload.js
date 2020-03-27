const { electron, app, BrowserWindow } = require('electron')
const path = require('path')
const Datastore = require('nedb')
const db = new Datastore({
    filename: path.join(__dirname,'app/db','user_settings.db'),
    autoload:true
})
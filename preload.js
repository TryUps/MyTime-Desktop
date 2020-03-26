const { electron, app, BrowserWindow } = require('electron')
const Datastore = require('nedb')
const settings_db = new Datastore({
    filename:'app/db/user_settings.db',
    autoload:true
})
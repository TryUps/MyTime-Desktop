const path = require('path')
const Datastore = require('nedb')
const db = new Datastore({
    filename: path.join(__dirname,'app/db','user_settings.db'),
    autoload:true
})

let settings = {
    name:'tray-menu',
    date: Date.now(),
    value: true
}
db.insert(settings, (err) => {
    console.error(err)
})
const Datastore = require('nedb')
const db = new Datastore({
    filename:'app/db/user_settings.db',
    autoload:true
})

let settings = {
    name:'tray-menu',
    date: 'today',
    value: true
}
db.insert(settings, (err) => {
    console.error(err)
})
const path = require('path'),
      sqlite = require('sqlite3').verbose(),
      dbpath = '../app/db',
      db = {}

db['to-do'] = new sqlite.Database(path.join(__dirname,dbpath,'to-do.db'), (err) => (err === null) ? false : console.error( err.message ) )

db['to-do'].serialize(() => {
    //db['settings'].run("CREATE TABLE users (user TEXT)")
    return false;
})
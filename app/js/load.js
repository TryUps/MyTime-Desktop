const $ = jQuery = require('jquery')
const path = require('path')
const loki = require('lokijs')

$(function(){
    // first run verify
    let db = new loki(path.join(__dirname,'db','app.db'), {
        autoload: true,
        autoloadCallback : initDB,
        autosave: true, 
        autosaveInterval: 4000
    })

    function initDB(){
        let settings = db.getCollection('settings')
        if(!settings) {
            settings = db.addCollection('settings', {unique: ['id'] , autoupdate: true })
        }

        let first_run = settings.findOne({ name:'first_run' })
        if(!first_run){
            let generate = {}
            generate['settings'] = {
                name: "first_run",
                value: false
            }
            settings.insert(generate['settings'])
            return trayAlert()
        }else{
            return console.info('All saved')
        }
    }

    function trayAlert(){
        $(".overlay").show()
        $("#trayAlert").show()
    }

    function trayYes(){
        let settings = db.getCollection('settings')
        let tray = {
            name: 'tray_menu',
            value: true
        }
        settings.insert(tray);
        $("#trayAlert").hide();
    }

    function trayNo() {
        let settings = db.getCollection('settings')
        let tray = {
            name: 'tray_menu',
            value: false
        }
        settings.insert(tray);
        $("#trayAlert").hide();
    }
})
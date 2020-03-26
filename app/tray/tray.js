const { app, BrowserWindow } = require('electron').remote

let trayWin

const createTray = () => {
    trayWin = new BrowserWindow({
        width:300,
        height:500
    })
}
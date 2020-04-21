const { app, BrowserWindow } = require('electron').remote

let trayWin

const trayMenu = () => {
    trayWin = new BrowserWindow({
        width:300,
        height:500
    })
}

const createTray = () => {
    tray = new Tray(path.join(__dirname,'icon.png'))
    tray.on('click', () => toggleWindow())
}

const toggleWindow = () => {
    trayWin.isVisible() ? trayWin.hide() : trayWin.show()
}

app.whenReady().then(trayMenu).then(createTray)
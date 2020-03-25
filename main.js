const { app, BrowserWindow, protocol, Menu, Tray } = require('electron')
const path = require('path')
const url = require('url')

let win
let tray = null
let PROTOCOL = 'mytime'
let FOLDER = 'app'

const createWindow = () => {

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

    win = new BrowserWindow({
        width: 700,
        height: 500,
        title: app.getName(),
        icon: path.join(__dirname,'icon.png'),
        titleBarStyle: 'hiddenInset',
        frame: false,
        show: false,
        autoHideMenuBar: true,
        useContentSize: true,
        webPreferences: {
            preload: path.join(__dirname,'preload.js'),
            nodeIntegration: true,
            webviewTag: true
        }
    })
  
    win.loadURL(url.format({
        pathname: 'index.html',
        protocol: PROTOCOL + ':',
        slashes: true
    }))

    win.webContents.openDevTools({mode: 'detach'})
    win.once('ready-to-show', () => win.show())
    win.on('close', () => win.webContents.send('stop-server'))
    win.on('closed', () => win = null)
}

const createTray = () => {
    tray = new Tray(path.join(__dirname,'icon.png'))
    tray.on('click', () => toggleWindow())
}

const toggleWindow = () => {
    win.isVisible() ? win.hide() : showWindow()
}

app.whenReady().then(createWindow).then(createTray)

const showWindow = () => {
    win.show();
}

app.on("browser-window-created", function(e, window) {
    window.setMenu(null);
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
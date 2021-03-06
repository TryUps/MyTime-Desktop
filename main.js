'use strict';

const { app, BrowserWindow, protocol, Menu, Tray } = require('electron')
const path = require('path')
const url = require('url')

let win
let tray = null
let PROTOCOL = 'mytime'
let FOLDER = 'app'

const createWindow = () => {

    win = new BrowserWindow({
        width: 800,
        height: 500,
        minWidth:800,
        minHeight:500,
        maxWidth:800,
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
        pathname: path.join(__dirname,'app','index.html'),
        protocol: 'file' + ':',
        slashes: true
    }))

    win.webContents.openDevTools({mode: 'detach'})
    win.once('ready-to-show', () => win.show())
    win.on('close', () => win.webContents.send('stop-server'))
    win.on('closed', () => win = null)
}


app.whenReady().then(createWindow)

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
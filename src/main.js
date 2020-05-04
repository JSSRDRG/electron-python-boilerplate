const electron = require('electron')
const path = require('path')
const url = require('url')
const ipc = require('./module/js/ipc.js')

const { app, BrowserWindow } = electron

let mainWindow

function createWindow () {
  const startUrl = url.format({
    pathname: path.join(__dirname, '/index.html'),
    protocol: 'file:',
    slashes: true
  })

  mainWindow = new BrowserWindow()

  mainWindow.loadURL(startUrl)
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

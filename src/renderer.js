const { ipcRenderer } = require('electron')

ipcRenderer.on('console', (event, message) => {
  console.log(message)
})

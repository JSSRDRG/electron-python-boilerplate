
const { PythonShell } = require('python-shell')

const shell = new PythonShell('src/main.py')

shell.on('message', (message) => {
  ipc.decode(message)
})

const ipc = {
  decode (input) {
    // Check if the (input) is start of a new packet
    const prefix = input.slice(0, 4)
    if (prefix !== '[py]') return

    const packet = JSON.parse(input.slice(4))
    // Determine which function to execute
    switch (packet.f) {
      // Console Object
      case 'err':
        console.error(packet.args)
        break
      case 'info':
        console.info(packet.args)
        break
      case 'log':
        console.log(packet.args)
        break
      case 'warn':
        console.warn(packet.args)
        break
      // If no match, throw error.
      default:
        throw new DecodeException(packet.f)
    }
  },
  ready () {
    //  this.send('ready')
  }
}

// Exceptions
function DecodeException (value) {
  this.message = `function ${value} can not be called from python shell`
  this.name = 'DecodeException'
}

module.exports = ipc

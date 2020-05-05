
const { PythonShell } = require('python-shell')
const zmq = require('zeromq')
const sock = zmq.socket('rep')

const shell = new PythonShell('src/main.py')

sock.bindSync('tcp://127.0.0.1:5555')
console.log('Bound to port 5555')

sock.on('message', (msg) => {
  ipc.decode(msg.toString())

  sock.send('hello')
})

const ipc = {
  decode (input) {
    const packet = JSON.parse(input)
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

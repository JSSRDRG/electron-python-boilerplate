
const { PythonShell } = require('python-shell')
const zmq = require('zeromq')
const sock = zmq.socket('rep')

const shell = new PythonShell('src/main.py')

sock.bindSync('tcp://127.0.0.1:5555')
console.log('Bound to port 5555')

sock.on('message', (msg) => {
  ipc.decode(msg.toString())
})

const ipc = {
  decode (input) {
    const packet = JSON.parse(input)
    // Determine which function to execute
    switch (packet.f) {
      // Document Object
      case 'dom':
        this.decodeDOM(packet)
        break
      // Console Object
      case 'err':
        console.error(packet.args)
        sock.send(1)
        break
      case 'info':
        console.info(packet.args)
        sock.send(1)
        break
      case 'log':
        console.log(packet.args)
        sock.send(1)
        break
      case 'warn':
        console.warn(packet.args)
        sock.send(1)
        break
      // If no match, throw error.
      default:
        throw new DecodeException(packet.f)
    }
  },
  decodeDOM (packet) {
    switch (packet.child) {
      case 'anchors':
        sock.send(document.anchors)
        break
      case 'gebi':
        sock.send(JSON.stringify(document.getElementById(packet.args)))
        break
      default:
        throw new DecodeException(packet.child)
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

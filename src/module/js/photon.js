// Photon module
const { PythonShell } = require('python-shell')
const zmq = require('zeromq')

class Photon {
  /**
   * TODO: add option for:
   *  - Port (Parsed to py as shell args)
   */
  constructor () {
    // Start Python execution
    this._shell = new PythonShell('src/main.py')

    // Setup a socket for IPC (Inter-Process-Communication)
    this._ipc = zmq.socket('rep')
    this._ipc.bindSync('tcp://127.0.0.1:5555')
    console.info('(Photon, IPC) Bound to port 5555')

    // Handle incoming from IPC
    this._ipc.on('message', (msg) => {
      this._ipc.send(Photon._ipcDecode(msg.toString()))
    })
  }

  static _ipcDecode (msg) {
    // Determine target Object
    let result = 0
    const packet = JSON.parse(msg)

    switch (packet.obj) {
      case 'dom':
        result = this._Document.execute(packet)
        break
      case 'console':
        result = this._Console.execute(packet)
        break
      // If no match, throw exception
      default:
        throw new DecodeException(packet.obj, packet.func, packet.args)
    }

    return result
  }
}
// Console Object
Photon._Console = class {
  static execute (packet) {
    let result = 0
    // Execute function from Console Object
    switch (packet.func) {
      case 'error':
        console.error(`(Photon, shell) ${packet.args}`)
        result = 1
        break
      case 'info':
        console.info(`(Photon, shell) ${packet.args}`)
        result = 1
        break
      case 'log':
        console.log(`(Photon, shell) ${packet.args}`)
        result = 1
        break
      case 'warn':
        console.warn(`(Photon, shell) ${packet.args}`)
        result = 1
        break
      // If no match, throw exception
      default:
        throw new DecodeException(packet.obj, packet.func, packet.args)
    }
    return result
  }
}
// Document Object
Photon._Document = class {
  static execute (packet) {
    let result = 0
    // Execute function from Document Object
    switch (packet.func) {
      case 'anchors':
        result = 1
        break
      case 'getelementbyid':
        result = 1
        break
      // If no match, throw exception
      default:
        throw new DecodeException(packet.obj, packet.func, packet.args)
    }
    return result
  }
}

// Exceptions
function DecodeException (o, f, a) {
  this.message = `function ${f}(${a}) from object: ${o} can not be called from Python`
  this.name = 'DecodeException'
}

module.exports = Photon

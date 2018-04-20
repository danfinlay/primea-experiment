const Hypervisor = require('primea-hypervisor')
const { Message, FunctionRef, ModuleRef } = require('primea-objects')
const BaseContainer = require('./container')
const Network = require('./network')

class MetaMaskController extends BaseContainer {

  constructor (opts) {
    super(opts)
    this.counter = 0
    this.network = new Network()
  }

  static get typeId () {
    return 'metamask-controller'
  }

  readData (funcRef) {
    const count = this.counter++
    var message = new Message({
      funcRef,
      funcArguments: ['blockchain data so live much impress: ' + count]
    })
    this.actor.send(message)
  }

}

module.exports = MetaMaskController


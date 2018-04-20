const Hypervisor = require('primea-hypervisor')
const { Message, FunctionRef, ModuleRef } = require('primea-objects')
const BaseContainer = require('./container')
const Network = require('./network')

class MetaMaskController extends BaseContainer {

  constructor (opts) {
    super(opts)
    this.networks = []
  }

  addNetwork (params) {
    this.networks.push(this.actor.createActor(Network.typeId, 0, params).module)
  }

  getNetworks (funcRef) {
    const message = new Message({
      funcRef,
      funcArguments: [this.networks.map(network => {
        const { module } = network
        return module
      })]
    })
  }

  static get typeId () {
    return 'metamask-controller'
  }

  readData (funcRef) {
    console.log('count from ' + this.networks.length)
    console.dir(this)
    var message = new Message({
      funcRef,
      funcArguments: [this.networks.length],
    })
    this.actor.send(message)
  }

}

module.exports = MetaMaskController


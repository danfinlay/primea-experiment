const Hypervisor = require('primea-hypervisor')
const { Message, FunctionRef, ModuleRef } = require('primea-objects')
const BaseContainer = require('./container')
const Network = require('./network')

class MetaMaskController extends BaseContainer {

  constructor (opts) {
    super(opts)
    this.actor.storage = []
  }

  addNetwork (params) {
    console.log('ADDING NETWORK')
    const network = this.actor.createActor(Network.typeId, 0, params)
    console.dir(network)
    this.actor.storage.push(network)
  }

  getNetworks (funcRef) {
    console.log('GETTING NETWORKS')
    console.dir(this.actor)
    console.dir(this.actor.storage)
    const message = new Message({
      funcRef,
      funcArguments: [this.actor.storage.map(network => network.id)],
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


const BaseContainer = require('./container')

class Network extends BaseContainer {

  constructor (opts) {
    super(opts)
    this.counter = 0
    this.accounts = []
  }

  static get typeId () {
    return 'ethereum-network-0.0.1'
  }

  getAccounts (funcRef) {
    const message = new Message({
      funcRef,
      funcArguments: []
    })
    this.actor.send(message)
  }

}

module.exports = Network


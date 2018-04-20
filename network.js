const BaseContainer = require('./container')

class Network extends BaseContainer {

  constructor (opts) {
    super(opts)
    this.counter = 0
  }

  static get typeId () {
    return 'ethereum-network-0.0.1'
  }

}

module.exports = Network


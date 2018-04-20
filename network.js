const BaseContainer = require('./container')

class Network extends BaseContainer {

  getNetworkType() {
    return 'ethereum-primea-0.0.1'
  }

}

module.exports = Network


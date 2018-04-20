const BaseContainer = require('./container')

class Account extends BaseContainer {

  constructor (opts) {
    super(opts)
  }

  static get typeId () {
    return 'ethereum-account-0.0.1'
  }

  signMessage (messageOpts, funcRefCallback) {
    console.log('account signing ', messageOpts)
    const message = new Message({
      funcRef,
      funcArguments: ['signed'],
    })
    this.actor.send(message)
  }

}

module.exports = Account


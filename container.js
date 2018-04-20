const Hypervisor = require('primea-hypervisor')
const { Message, FunctionRef, ModuleRef } = require('primea-objects')

class BaseContainer {
  constructor (actor) {
    this.actor = actor
  }
  onStartup () {}

  static onCreation (code, id) {
    const exp = {}
    Object.getOwnPropertyNames(this.prototype).filter(name => name !== 'constructor').forEach(name => {
      exp[name] = {}
    })
    return new ModuleRef(exp, id)
  }
  onMessage (message) {
    return this[message.funcRef.identifier[1]](...message.funcArguments)
  }
  static get typeId () {
    return 9
  }
}

module.exports = BaseContainer


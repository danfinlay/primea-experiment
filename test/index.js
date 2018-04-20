const test = require('tape')
const Hypervisor = require('primea-hypervisor')
const EgressDriver = require('primea-hypervisor/egressDriver')
const { Message, FunctionRef, ModuleRef } = require('primea-objects')
const MetaMask = require('../metamask')
const RadixTree = require('dfinity-radix-tree')
const level = require('level-browserify')
const db = level('./testdb')

test('counter', function (t) {

  const tree = new RadixTree({
    db
  })

  const hypervisor = new Hypervisor({ tree, containers: [ MetaMask ] })

  const { module } = hypervisor.createActor(MetaMask.typeId)
  const egress = new EgressDriver()
  egress.on('response', (msg) => {
    console.log('egress called with ' + msg)
    t.ok(msg.indexOf('1'))
    t.end()
  })

  const funcRef = module.getFuncRef('readData')
  console.dir(funcRef)

  const message = new Message({
    funcRef,
    funcArguments: [],
  })

  hypervisor.send(message)

})



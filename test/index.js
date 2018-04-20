const test = require('tape')
const Hypervisor = require('primea-hypervisor')
const EgressDriver = require('primea-hypervisor/egressDriver')
const { Message, FunctionRef, ModuleRef } = require('primea-objects')
const MetaMask = require('../metamask')
const Network = require('../network')
const RadixTree = require('dfinity-radix-tree')
const level = require('level-browserify')
const db = level('./testdb')
const BaseContainer = require('../container')

test('counter', function (t) {
  const tree = new RadixTree({
    db
  })

  const egress = new EgressDriver()

  egress.on('message', msg => {
    t.ok(msg.funcArguments[0].indexOf('1') != 0, 'counter worked!')
    t.end()
  })

  const hypervisor = new Hypervisor({
    tree,
    containers: [MetaMask],
    drivers: [egress]
  })
  const {module} = hypervisor.createActor(MetaMask.typeId)

  const message = new Message({
    funcRef: module.getFuncRef('readData'),
    funcArguments: [new FunctionRef({actorID: egress.id})]
  })

  hypervisor.send(message)})



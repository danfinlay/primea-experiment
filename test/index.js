const test = require('tape')
const Hypervisor = require('primea-hypervisor')
const EgressDriver = require('primea-hypervisor/egressDriver')
const { Message, FunctionRef, ModuleRef } = require('primea-objects')
const MetaMask = require('../metamask')
const Network = require('../network')
const Account = require('../account')
const RadixTree = require('dfinity-radix-tree')
const level = require('level-browserify')
const db = level('./testdb')
const BaseContainer = require('../container')

test('counter', async function (t) {
  const tree = new RadixTree({
    db
  })

  const egress = new EgressDriver()

  egress.on('message', msg => {
    console.log('returned alright')
    console.dir(msg)
    t.ok(msg.funcArguments[0] === 1, 'network added!')
    t.end()
  })

  const hypervisor = new Hypervisor({
    tree,
    containers: [MetaMask, Network, Account],
    drivers: [egress]
  })
  const { module: metaMask } = hypervisor.createActor(MetaMask.typeId)
  console.dir(metaMask)

  const addNetworkMsg = new Message({
    funcRef: metaMask.getFuncRef('addNetwork'),
    funcArguments: 'custom network',
  })
  hypervisor.send(addNetworkMsg)
  await hypervisor.createStateRoot()

  const message = new Message({
    funcRef: metaMask.getFuncRef('getNetworks'),
    funcArguments: [new FunctionRef({actorID: egress.id})]
  })

  hypervisor.send(message)

})



/*
 * An object whose keys all have Function values that return promises.
 * @typedef ApiObject
 */

const dnode = require('dnode')
const dnodep = require('dnode-promise')

const MetaMaskController = require('./metamask')
const controller = new MetaMaskController()
const api = controller.getPublicApi()



const dnodeApi = dnode(api)

dnodeApi.listen(5004)






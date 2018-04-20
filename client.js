const dnode = require('dnode-promise')

console.dir(dnode)
const d = dnode.connect(5004)
d.on('remote', (remote) => {
  console.dir(remote)
})


const {
  token
} = require('./config/config')
const {
  cluster,
  shard
} = require('./config/system')

const Sharder = require('eris-sharder').Master
const sharder = new Sharder(token, '/src/star.js', {
  stats: true,
  debug: true,
  guildsPerShard: 1500,
  name: 'starbot',
  webhooks: {
    shard: {
      id: shard.id,
      token: shard.token
    },
    cluster: {
      id: cluster.id,
      token: cluster.token
    }
  },
  clientOptions: {
    messageLimit: 150,
    defaultImageFormat: 'png'
  }
})
sharder.on('stats', stats => {
  console.log(stats)
})

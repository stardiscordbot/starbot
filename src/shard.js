const {
  token,
  webhook
} = require('./config/config.js');
const {
  shard,
  cluster
} = require("./System/webhooks.json")
const Sharder = require('eris-sharder').Master;

const sharder = new Sharder(token, "/src/star.js", {
  stats: true,
  debug: true,
  guildsPerShard: 1500,
  name: "StarBot",
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
      messageLimit: 200,
      defaultImageFormat: "png"
  }
});

sharder.on("stats", stats => {
  console.log(stats);
});
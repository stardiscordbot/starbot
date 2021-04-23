const config = require("./src/config/json/config.json");
const {ShardingManager} = require('discord.js');
//var numWorkers = require('os').cpus().length;
const cor = require("colors");

const manager = new ShardingManager('./bot.js', { 
    totalShards: 'auto', //numWorkers, //'auto',
    token: config.discord.token, 
    respawn: true
});

manager.on('shardCreate', shard => {
    console.log(cor.rainbow(`[SHARD] Iniciando shard ${shard.id}`))
});
manager.spawn();
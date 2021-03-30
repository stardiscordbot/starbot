const config = require("./src/config/json/config.json");
const {ShardingManager} = require('discord.js');
const cor = require("colors");

const manager = new ShardingManager('./bot.js', { 
    totalShards: 'auto',
    token: config.discord.token, 
    respawn: true
});

manager.on('shardCreate', shard => {
    console.log(cor.magenta(`[SHARD] Iniciando shard ${shard.id}`))
});
manager.spawn();
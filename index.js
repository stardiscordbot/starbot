const color = require("colors")
const config = require("./config.json")
const { ShardingManager, WebhookClient } = require('discord.js');
const hook = new WebhookClient(config.hookID, config.hookTOKEN);
const shard = new ShardingManager('./bot.js', {
    totalShards: 2, 
    respawn: true, 
});
shard.on('shardCreate', shard => {
    console.log(`[SHARD] - Iniciando shard ${shard.id}`.brightCyan)
    hook.send(`<:online:769404416649461761> Shard ${shard.id} iniciada <:online:769404416649461761>`)
});
shard.spawn();
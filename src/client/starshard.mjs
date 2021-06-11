import discord from 'discord.js-light';
const {
    ShardingManager
} = discord;
export default class BombaShards {
    constructor(quantia, local, config) {
        const starShard = new ShardingManager(local, {
            totalShards: quantia,
            token: config.token,
            respawn: true
        });

        starShard.on('shardCreate', async shard => {
            console.log(`[SHARD] ${shard.id} Iniciada!`.blue);
        });

        starShard.spawn();
    }
}
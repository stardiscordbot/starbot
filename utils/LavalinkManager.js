const { Manager } = require("lavacord");
const player = require("../jsons/player.json")
const { MessageEmbed } = require("discord.js-light")

module.exports = (client) => {

console.log('[LAVALINK] Conectado com sucesso.'.cyan)

const nodes = [
    { id: "1", host: player.host, port: player.port, password: player.pass }
]; 

  client.player = new Manager(nodes, {
    user: client.user.id,
    shards: client.options.shardCount,
    send: (packet) => {
    }

});

client.player.connect();

client.player.on("error", (error, node) => {
    console.log(`[LAVALINK] Erro, node: "${node}", erro: "${error}"`.red)
});

//console.log(client.player)

}
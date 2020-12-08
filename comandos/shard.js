const API = require("../shardconfig")
const AsciiTable = require('ascii-table')
table = new AsciiTable('Star™️ - Shards')

module.exports.run = async(client, message, args, prefix) => {

  table.setHeading('SID', 'UpTime', 'Ping', 'Usage', 'Guilds', 'Users')

  table.setAlign(0, AsciiTable.CENTER)
	table.setAlign(1, AsciiTable.CENTER)
	table.setAlign(2, AsciiTable.CENTER)
	table.setAlign(3, AsciiTable.CENTER)
	table.setAlign(4, AsciiTable.CENTER)
  table.setAlign(5, AsciiTable.CENTER)
  table.setBorder('|', '-', '+', '+')


  let servidores = await client.shard.fetchClientValues('guilds.cache.size')
  let usuarios = await client.shard.fetchClientValues('users.cache.size')
  let memoria = await client.shard.broadcastEval(`process.memoryUsage().rss`)
  let ping = await client.shard.fetchClientValues('ws.ping')
  let uptime = await client.shard.fetchClientValues('uptime')

  for(let i = 0; i < client.options.shardCount; i++) {
      table.addRow(i === message.guild.shard.id ? i + '*' : i, API.time2(uptime[i]), '~' + ping[i] + 'ms', API.bytes(memoria[i]).value + API.bytes(memoria[i]).unit, servidores[i].toLocaleString('pt-br'), usuarios[i].toLocaleString('pt-BR'))
  }


  let total_servers = servidores.reduce((prev, val) => prev + val)
  let total_users = usuarios.reduce((prev, val) => prev + val)
  let total_mem = memoria.reduce((prev, val) => prev + val)
  let ping_media = ping.reduce((prev, val) => prev + val)
  let media = ping_media / client.options.shardCount

  table.addRow('______', '______', '______', '______', '______', '______', '______')

  table.addRow('TOTAL', '-', '~' + Math.round(media) + 'ms', API.bytes(total_mem, 2).value + API.bytes(total_mem, 2).unit, total_servers.toLocaleString('pt-BR'), total_users.toLocaleString('pt-BR'))

  message.quote(table.toString(), { code: 'apache' })

  return table.clearRows()

}

exports.help = {
    name: 'shard',
    aliases: ['shards', 'shardinfo']
}
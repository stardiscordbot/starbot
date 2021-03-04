module.exports = (client) => {

  client.once('ready', () => {
    //client.user.setStatus("idle")
    //client.manager.init(client.user.id);
    console.log(`[BOT] ${client.user.tag} se conectou na API do Discord.\n[BOT] ${client.guilds.cache.size} servidores.`.green)
    client.user.setActivity(`s!help • ${client.guilds.cache.size} servidores`)
    setInterval(()=>{
      client.channels.cache.sweep(c=>c.type!='text')
    //  client.users.cache.clear()
      for(var sv in client.guilds.cache.values()){
       // sv.members.cache.clear()
        sv.channels.cache.sweep(c=>!client.channels.cache.get(c.id))
      }
    },10000)
  })
  global.gc()
}
//BONEE e Davi
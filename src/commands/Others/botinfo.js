const Discord = require("discord.js");
const os = require("os");
const comando2 = require('../../mongodb/command')
const config = require('../../config.json')

module.exports.run = async (client, message, args, prefix) => {

  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;  
  let modelo = os.cpus().map((i) => `${i.model}`)[0]
/*
  const promises = [
    client.shard.fetchClientValues('users.cache.size'),
    client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.fetchClientValues('channels.cache.size'),
];

Promise.all(promises).then(async results => {
    const totalUsers = results[0].reduce((prev, userCount) => prev + userCount, 0);
    const totalGuilds = results[1].reduce((prev, guildCount) => prev + guildCount, 0);
    const totalCanais = results[2].reduce((prev, channelCount) => prev + channelCount, 0);
*/
  const adg = await client.users.fetch('717766639260532826');
  const gustavo = await client.users.fetch('664174201220890645');
  const bonee = await client.users.fetch('672652538880720896');
  const etinho = await client.users.fetch('422535241211707393');
  const andre = await client.users.fetch('742798447253651506');
  const davi = await client.users.fetch('704468807229505637')
  /*
  const botinfo = new Discord.MessageEmbed()
  .setAuthor('Minhas Informações')
  .setThumbnail(client.user.displayAvatarURL())
  .setColor(config.color)
  .addField('<:botdeveloper:763739544549326899>┃Criadores', `\`${adg.tag}, ${gustavo.tag}, ${bonee.tag}, ${etinho.tag}\``)
  .addField(`<:staff:763739862360653864>┃Servidores`,`\`${client.guilds.cache.size}\``)
  .addField('<:stafftools:770038834922389524>┃Canais', `\`${client.channels.cache.size}\``)
  .addField(`<:panda:754744551176011826>┃Usuários`, `\`${client.users.cache.size}\``)
  .addField(`<:gaming_keyboard:770039079969882122>┃Memória RAM`,`\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB de 1024MB\``)
  .addField(`💻┃CPU`, `\`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}% de CPU\``)
  .addField(`<:cpu:770039330398797834>┃Processador`, `\`${modelo}\``)
  .addField(`<:discord:770039545067995136>┃Ping`,`\`Latência do Servidor: ${Date.now()-message.createdTimestamp}ms\nLatência da API: ${client.ws.ping}ms\``)
  .addField('<:relogio:763736359822819338>┃Tempo de Atividade', `\`${days.toFixed()} dias ${hours.toFixed()} horas ${minutes.toFixed()} minutos ${seconds.toFixed()} segundos\``)
  .setImage('https://top.gg/api/widget/719524114536333342.png')
   */
  let uptime = `${days.toFixed()} dias ${hours.toFixed()} horas ${minutes.toFixed()} minutos ${seconds.toFixed()} segundos`
  const botinfo = new Discord.MessageEmbed()
  .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({dynamic:true}), 'https://www.stardcbot.tk/')
  .setDescription(`Olá, meu nome é **${client.user.username}**, tenho 13 anos e sou um simples bot para discord, fui criada por \`${adg.username}\` no dia: \`08/06/2020\`. Atualmente estou em **${client.guilds.cache.size} servidores** e tenho **${client.commands.size} comandos** diversos para seu servidor <:star_todeolho:796455451621326859>\n\nFui programada em <:nodejs:753727823008759838> [JavaScript](https://pt.wikipedia.org/wiki/JavaScript) usando a biblioteca do [discord.js](http://discord.js.org/) (alias eu sou open-source, se quiser dar uma olhada clique [aqui](https://github.com/yADGithub/starbot/tree/developer))\n\nEstou acordada a **${uptime}**`)
  .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
  .addField('<:star_todeolho:796455451621326859> • Lista de comandos', '[Clique Aqui](https://starbot-website.yadg.repl.co/comandos)', true)
  .addField('🐦 • Twitter', '[Clique Aqui](https://twitter.com/Starzinha_BOT)', true)
  .addField('<:discord:770039545067995136> • Suporte', '[Clique Aqui](https://discord.gg/2pFH6Yy)', true)
  .addField('💻 • Desenvolvedores', `> \`${adg.tag}\`\n> \`${gustavo.tag}\`\n> \`${bonee.tag}\`\n> \`${etinho.tag}\`\n> \`${andre.tag}\`\n> \`${davi.tag}\``)
  .addField('🏅 • Pessoas Importantes', `> 🎖️ • \`${adg.tag}\` por ter me criado\n> 🎖️ • Todas a minha staff que me mantém segura!\n> 🎖️ • [Zuraaa! List](https://discord.gg/EShHzNtVAb) por patrocinar a hospedagem\n> 🎖️ • E você ${message.author}, por me ultilizar <:catblush:774345793271889920>`)
  .setColor(config.color)
  message.quote(botinfo).then(msg=>{
    const collectfilter = (reaction, user) => reaction.emoji.name === 'star_desconfiada' && user.id === message.author.id;
    const colletor = msg.createReactionCollector(collectfilter, { time: 30000 });
    msg.react('796457831934853140')
    colletor.on('collect', r => {
      colletor.stop()
      comando2.findOne({nome:"star"}, async (err, db) => {
        if(db) {
          let botinfo2 = new Discord.MessageEmbed()
          .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({dynamic:true}), 'https://www.stardcbot.tk/')
          .setDescription(`${message.author}, já que ficou mais curioso, estou aqui para te dar umas informações extras sobre mim e minha maquina`)
          .addField('<:gaming_keyboard:770039079969882122> • Minha Versão', `Atualmente estou na versão: \`${config.versão}\``, true)
          .addField('<:nodejs:753727823008759838> • Versão do NodeJS', `Meu Node é o: \`${process.version}\``, true)
          .addField('<:config:754048572734832801> • Processador', `Meu processador é: \`${modelo}\``, true)
          .addField('<:bot:771776061481943111> • Hospedagem', `Atualmente estou hospedada em servidores da [contabo](https://contabo.com/) patrocinado pelo projeto dev support da [Zuraaa! List](https://discord.gg/EShHzNtVAb)`, true)
          .addField('<:download:796419001990643773> • Database', `Eu uso a database [MongoDB Atlas](https://www.mongodb.com/) uma das melhores databases do mercado, dados seguros = vida segura 🥳`, true)
          .addField('<:panda:754744551176011826> • Comandos Executados', `Atualmente já executei \`${db.quantidade} comandos\` em diferentes servidores`, true)
          .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
          .setColor(config.color)
      message.quote(botinfo2)
        }
        if(!db) {
          let botinfo3 = new Discord.MessageEmbed()
          .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({dynamic:true}), 'https://www.stardcbot.tk/')
          .setDescription(`${message.author}, já que ficou mais curioso, estou aqui para te dar umas informações extras sobre mim e minha maquina`)
          .addField('<:gaming_keyboard:770039079969882122> • Minha Versão', `Atualmente estou na versão: \`${config.versão}\``, true)
          .addField('<:nodejs:753727823008759838> • Versão do NodeJS', `Meu Node é o: \`${process.version}\``, true)
          .addField('<:config:754048572734832801> • Processador', `Meu processador é: \`${modelo}\``, true)
          .addField('<:bot:771776061481943111> • Hospedagem', `Atualmente estou hospedada em servidores da [contabo](https://contabo.com/) patrocinado pelo projeto dev support da [Zuraaa! List](https://discord.gg/EShHzNtVAb)`, true)
          .addField('<:download:796419001990643773> • Database', `Eu uso a database [MongoDB Atlas](https://www.mongodb.com/)`)
          .addField('<:panda:754744551176011826> • Comandos Executados', `Não executei nenhum comando :(`)
          .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
          .setColor(config.color)
           message.quote(botinfo3)
        }
      })
    })
  })
  }
exports.help = {
    name: 'botinfo',
    aliases: ['starinfo'],
    status: 'on',
    category: 'others'
}
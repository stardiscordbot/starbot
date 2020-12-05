const { client } = require("../bot.js");
const config = require("../config.json");
const Discord = require('discord.js')
const c = require('colors')

const comando = new Discord.WebhookClient(config.logID, config.logToken)
client.on("message", async message => {
    // If's
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    antilink.findOne({_id:message.guild.id}, (err, anti) => {
      if(anti){
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        if (message.member.permissions.has("ADMINISTRATOR")) return;
        if (message.content.toLowerCase().includes("https://")){
        console.log(c.bold(`[ANTILINK] - Antilink: ${message.guild.name}`))
        message.delete()
        message.quote('você não pode enviar links aqui!')
        }
        if (message.content.toLowerCase().includes("http://")){
        console.log(c.bold(`[ANTILINK] - Antilink: ${message.guild.name}`))
        message.delete()
        message.quote('você não pode enviar links aqui!')
        }
        if (message.content.toLowerCase().includes("www.")){
        console.log(c.bold(`[ANTILINK] - Antilink: ${message.guild.name}`))
        message.delete()
        message.quote('você não pode enviar links aqui!')
        }
      }
  })
    // Custom Prefix
    pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
      let prefix = res ? res.prefix : config.prefix;
      if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)){
        return message.quote(`<a:Rosa_seta_pg:754374503001358467> Olá, ${message.author}! Meu prefixo atual é \`${prefix}\` para ver meus comandos use \`${prefix}ajuda\``)}
    if (!message.content.startsWith(prefix)) return;
    // Deletar Comando
    dc.findOne({_id:message.guild.id}, (err, dc) => {
      if(dc){
        message.delete()
      }
    })
    // Caso o user esteja banido
    bldb.findOne({_id:message.author.id}, (err, bl) => {
      if(bl) {
        const detectado = new Discord.MessageEmbed()
        .setTitle("<a:ban_cat:768210628913266689> | Você está Banido")
        .setColor("ff0000")
        if(!bl.motivo) {
          detectado.setDescription(`Você foi banido de ultilizar a Star:tm: por desrespeitar os termos de uso, caso ache que isto é um engano contate nosso [suporte](https://discord.gg/2pFH6Yy) e tentaremos resolver\n\n**Motivo:** \`Não Definido - Punido por: ${bl.autorTag}\`\n**Apelação:** \`Você pode enviar uma apelação para seu unban: https://bit.ly/star-unban\``)
      } else if(bl.motivo) {
        detectado.setDescription(`Você foi banido de ultilizar a Star:tm: por desrespeitar os termos de uso, caso ache que isto é um engano contate nosso [suporte](https://discord.gg/2pFH6Yy) e tentaremos resolver\n\n**Motivo:** \`${bl.motivo} - Punido por: ${bl.autorTag}\`\n**Apelação:** \`Você pode enviar uma apelação para seu unban: https://bit.ly/star-unban\``)
      }
         return message.quote(detectado)
          }
    // Alguns Args
    var args = message.content.substring(prefix.length).split(" ");
    let cmd = args.shift().toLowerCase();
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    let command =client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(command.help.status === 'off') return message.reply('sinto muito, esse comando está desabilitado, aguarde');
    if (command) {
      command.run(client, message, args);
    } else {
      console.log(`${message.author} Usou o comando inexistente ${message.content}`);
    }
    if (!message.content.toLowerCase().startsWith(prefix)) return;
            let embeddiretor = new Discord.MessageEmbed()
                .setTitle("🔔 • Log de comandos!")
                .setColor("RANDOM")
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**Usuário:** \`${message.author.tag}\` \n **ID:** \`${message.author.id}\` \n **Comando:** \`${message.content}\` \n**URL:** [Clique Aqui](${message.url}) \n\n **🔍 • Dados do servidor!**\n \n **Nome:** \`${message.guild.name}\` \n **ID:** \`${message.guild.id}\` \n**Membros:** \`${message.guild.memberCount}\` \n **Canais:** \`${message.guild.channels.cache.size}\``)
                comando.send(embeddiretor);
    console.log(c.brightMagenta(`[LOG DE COMANDOS]\nUsuário: ${message.author.tag}\nID: ${message.author.id}\nComando: ${message.content}\n\n[DADOS SERVIDOR]\nNome: ${message.guild.name}\nID: ${message.guild.id}\nMembros: ${message.guild.memberCount}\nCanais: ${message.guild.channels.cache.size}`))
  });
})
})
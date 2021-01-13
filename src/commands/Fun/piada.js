const piadasLib = require('../../../npms/piadas-lib/src/index.js')
const Discord = require("discord.js")


module.exports.run = async(client, message, args, prefix) => {
    const PiadasClient = new piadasLib();
    const piada = await PiadasClient.randomPiada()
    const pobre = new Discord.MessageEmbed()
    .setAuthor('Cachorro', 'https://media.discordapp.net/attachments/754461904575135815/773275095430856744/tenor.gif')
    .setDescription(`**P:** ${piada.question}\n**R:** ${piada.answer}`)
    .setFooter('Já que não tenho permissão de gerenciar webhooks mandei a mensagem no modo de pobre :(')
      if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS","ADMINISTRATOR")) return message.quote(pobre)

  message.channel.createWebhook("Cachorro", {
      avatar: "https://media.discordapp.net/attachments/754461904575135815/773275095430856744/tenor.gif",
      reason: "Criar um weehbook para piadas"
  }).then(async r => {
      await r.send(`**P:** ${piada.question}\n**R:** ${piada.answer}`)
      r.delete()
  })

}

exports.help = {
    name: 'piada',
    aliases: ["joke"],
    status: 'on'
}
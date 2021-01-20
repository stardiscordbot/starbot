/**/

const Discord = require("discord.js");
const config = require('../../config.json')
const pr = require('../../mongodb/prefix.js')

var eightball = [ 
        "sim",
        "não",
        "talvez",
        "provavelmente",
        "acho que não",
        "nunca",
        "você pode tentar...",
        "você Decide!",
        "sem Sombra de duvidas!",
        "não pergunte isto agora",
        "pergunte a meu patrão",
        "não é da sua conta",
        "tu que deixa",
]

module.exports.run = async (client,message,args,prefix) => {
        // Coisas de Exemplo
    const comando = '8ball'
    const ultilização = '[sua pergunta]'
    const aliases = '8b, magicball, eightball, oraculo'
    const exemplo = 'eu sou lindo?'
    const exemploFoto = 'https://media.discordapp.net/attachments/754461904575135815/777641706509041704/unknown.png'
    const permissão = 'Nenhuma'
    // Custo Prefix
  pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
    let prefix = res ? res.prefix : config.prefix;
    // Embed de Exemplo
  const exemploembed = new Discord.MessageEmbed()
  .setTitle(`${client.user.username} | ${comando}`)
  .addField(`🔨 Ultilização:`,`\`${prefix}${comando} ${ultilização}\``)
  .addField(`📖 Exemplo:`, `\`${prefix}${comando} ${exemplo}\``)
  .addField(`📛 Permissões:`, `\`${permissão}\``)
  .addField(`🔀 Aliases:`, `\`${aliases}\``)
  .setColor(config.color)
  .setImage(`${exemploFoto}`)
     if (args[0] != null) {
        var embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} | Oráculo`, client.user.displayAvatarURL())
        .setColor(config.color)
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/8-Ball_Pool.svg/1024px-8-Ball_Pool.svg.png")
        .setDescription(`\`${message.author.username}, de acordo com muitos estudos cientificos minha resposta é ${eightball[Math.floor(Math.random() * eightball.length).toString(16)]}\``)
        .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        message.quote(embed)
    }
      else message.quote(exemploembed)
    })
}
module.exports.help = {
    name: "8ball",
    aliases: ['8b', 'magicball', 'eightball', 'oraculo'],
    status: 'on',
    category: 'div'
}
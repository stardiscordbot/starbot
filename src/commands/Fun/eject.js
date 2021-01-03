/**/

const Discord = require("discord.js");
const config = require('../../config.json')
const pr = require('../../mongodb/prefix.js')

var color = [ 
        "blue",
        "white",
        "pink",
        "red",
        "cyan",
        "purple",
        "black",
        "yellow",
        "brown",
        "orange"
]

var crew = [ 
    "true",
    "false"
]

module.exports.run = async (client,message,args) => {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.filter(a => a.username == args.join(" ")) || args.join(' ') ||message.author
    const a = user.username.toString().replace(/ /gi, "%20")

    let crewmate = crew[Math.floor(Math.random() * crew.length).toString(2)]
    let crewcolor = color[Math.floor(Math.random() * color.length).toString(16)]

  pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
    let prefix = res ? res.prefix : config.prefix;
        const eject = new Discord.MessageEmbed()
        .setTitle(`<:Laranja:782671789569474610> | Simulador de Ejeção`)
        .setColor('ff0000')
        .setImage(`https://vacefron.nl/api/ejected?name=${a}&impostor=${crewmate}&crewmate=${crewcolor}`)
        .setFooter(`Comando Executado por ${message.author.tag} • ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        message.quote(eject)
});
} // ${eightball[Math.floor(Math.random() * eightball.length).toString(16)]}
module.exports.help = {
    name: "eject",
    aliases: ['ejetar'],
    status: 'on',
    category: 'div'
}
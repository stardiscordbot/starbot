const {MessageEmbed} = require("discord.js");

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

module.exports = class Command {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'eject',
          categoria: '🤣 • Fun',
          desc: 'Ejete aquele seu amigo que você acha que é o impostor'
        },
        en: {
          nome: 'eject',
          categoria: '🤣 • Fun',
          desc: 'Eject that friend of yours who you think is the impostor'
        },
      aliases: ['ejetar'],
      run: this.run
    }
  }
  
  async run(client, message, args, prefixoCerto, idioma) {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.filter(a => a.username == args.join(" ")) || args.join(' ') ||message.author
    const a = user.username.toString().replace(/ /gi, "%20")

    let crewmate = crew[Math.floor(Math.random() * crew.length).toString(2)]
    let crewcolor = color[Math.floor(Math.random() * color.length).toString(16)]


        const eject = new MessageEmbed()
        .setTitle(`<:Laranja:782671789569474610> | ${idioma.eject.sim}`)
        .setColor('ff0000')
        .setTimestamp()
        .setImage(`https://vacefron.nl/api/ejected?name=${a}&impostor=${crewmate}&crewmate=${crewcolor}`)
        .setFooter(`${message.author.tag} `, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        message.quote(eject)

 } 

}

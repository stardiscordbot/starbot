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

    let user = args[0] ? message.mentions.users.first() ||  client.users.cache.find(a => a.username === args.slice(0).join(' ')) || await client.users.fetch(args[0]).catch(_ => message.author) : message.author
    const a = user.username.toString().replace(/ /gi, "%20")

    let crewmate = crew[Math.floor(Math.random() * crew.length).toString(2)]
    let crewcolor = color[Math.floor(Math.random() * color.length).toString(16)]

    message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async m => {
      message.channel.startTyping()
    const url = `https://vacefron.nl/api/ejected?name=${a}&impostor=${crewmate}&crewmate=${crewcolor}`
        
        const attachment = new (require("discord.js")).MessageAttachment(url, `eject-${message.author.id}.png`);

        message.quote(message.author, attachment).then(m2 =>{
          message.channel.startTyping()
          m.delete()
        })
      })
 } 

}

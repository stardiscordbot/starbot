module.exports = class SugerirCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ADD_REACTIONS'], //Permissoes que o bot necessita
          dono: false, //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'sugerir',
          categoria: '💭 • Sugestões',
          desc: 'Descrição'
        },
        en: {
          nome: 'suggest',
          categoria: '💭 • Suggestions',
          desc: 'Description'
        },
      aliases: ['sugerir', 'suggest', 'sugestão', 'suggestion', 'sugetao'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

      const sugchannel = await client.db.get(`sugestao-${message.guild.id}`)

      if(!sugchannel) return message.quote(`:x: ${message.author} **|** ${idioma.sugestao.nocanal}`)

      if(!args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.sugestao.nada}`);
      
      const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
      
      if(message.content.toLowerCase().includes("https://")) return message.quote(`:x: ${message.author} **|** ${idioma.sugestao.link}`);
      if(message.content.toLowerCase().includes("http://")) return message.quote(`:x: ${message.author} **|** ${idioma.sugestao.link}`);
      if(message.content.toLowerCase().includes("www.")) return message.quote(`:x: ${message.author} **|** ${idioma.sugestao.link}`);
      if(regex.exec(args.join(" "))) return message.quote(`:x: ${message.author} **|** ${idioma.sugestao.link}`);
      
      const sugembed = new (require("discord.js")).MessageEmbed()
      .setThumbnail("https://media.discordapp.net/attachments/719978696278278224/821814940938928149/lightbulb-graphic-on-yellow.jpg")
      .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic:true}))
      .setDescription(`**${idioma.sugestao.nova}**\n> \`${args.join(" ").replace(/`/g, '')}\``)
      .setColor("YELLOW")
      .setFooter(`${idioma.sugestao.footer.replace("%u", client.user.username)}`, client.user.displayAvatarURL({dynamic:true}))
      .setTimestamp()
      message.react("✔️")
      client.channels.cache.get(sugchannel).send(sugembed).then(m => {
          m.react("👍")
          m.react("👎")
      })
    }
  }

//ADG
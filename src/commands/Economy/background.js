module.exports = class BackgroundCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'background',
          categoria: '💸 • Economia',
          desc: 'Compre Planos de Fundo para seu perfil'
        },
        en: {
          nome: 'background',
          categoria: '💸 • Economy',
          desc: 'Buy Backgrounds for your profile'
        },
      aliases: ['background'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
      const background = require("../../config/database/backgrounds.json");
      const economy = require("../../config/database/mongodb/economy");
      const rand = Math.floor(Math.random() * background.backgrounds.length);
      const tema = background.backgrounds[rand];

      economy.findOne({ User: message.author.id }, async(err, data) => {

      const embed = new (require("discord.js")).MessageEmbed()
      .setDescription(`🛒 ${message.author} **|** ${idioma.perfil.comp}, ¥${tema.value.toLocaleString()}`)
      .setColor("ff0000")
      .setImage(tema.url)
      message.quote(embed).then(m => {

        m.react("🛒")
        const accept = (reaction, user) => reaction.emoji.name === '🛒' && user.id === message.author.id;
        const acc = m.createReactionCollector(accept, { time: 60000 });

        acc.on('collect', r1 => {
          acc.stop()
          
          if(!data) return message.quote(`:x: ${message.author} **|** ${idioma.perfil.no}`)
          if(data.Money < tema.value) return message.quote(`:x: ${message.author} **|** ${idioma.perfil.no}`)

          client.db.set(`background-${message.author.id}`, `${tema.url}`)

          data.Money = data.Money - tema.value;
          data.save()

          const buyembed = new (require("discord.js")).MessageEmbed()
          .setDescription(`🛒 ${message.author} **|** ${idioma.perfil.succ}`)
          .setColor("ff0000")
          .setImage(tema.url)
          m.edit(buyembed)
        }) 

      })
    })
    }
  }
  
  //ADG
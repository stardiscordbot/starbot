module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'casar',
          categoria: '(Emoji) Testes',
          desc: 'Descrição'
        },
        en: {
          nome: 'marry',
          categoria: '(Emoji) Testing',
          desc: 'Description'
        },
      aliases: ['marry', 'casar'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
    
        if(!args[0]) return message.quote(`:x: ${message.author} **|** Você precisa mencionar alguém para poder casar`);

        const marry = message.mentions.users.first() || await client.users.fetch(args[0]);

        if(marry.id == message.author.id) return message.quote(`:x: ${message.author} **|** ${idioma.marry.vc}`)

        message.quote(`💍 ${marry} **|** **${message.author.username}** ${idioma.marry.deseja}`).then(msg => {
          msg.react("✅").then(r => {

        const marryfilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === marry.id;
        
        msg.createReactionCollector(marryfilter, { time: 60000 }).on("collect", async r => {
          await client.db.set(`marry-${message.author.id}`, `${marry.id}`)
          await client.db.set(`marry-${marry.id}`, `${message.author.id}`)

            msg.channel.send(`💍 Eu vos declaro casados`).then(m => {
            m.react("🥳")
            })

          })

        })
      })
    }
  }
  
  //ADG
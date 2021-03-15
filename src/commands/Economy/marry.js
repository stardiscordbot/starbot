module.exports = class MarryCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'casar',
          categoria: '💸 • Economia',
          desc: 'Se casa com algum membro do servidor'
        },
        en: {
          nome: 'marry',
          categoria: '💸 • Economy',
          desc: 'Marries a member of the server'
        },
      aliases: ['marry', 'casar'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

        const casado = await client.db.get(`marry-${message.author.id}`);

        if(!args[0]) return message.quote(`:x: ${message.author} **|** Você precisa mencionar alguém para poder casar`);

        const marry = message.mentions.users.first() || await client.users.fetch(args[0]);

        const casado2 = await client.db.get(`marry-${marry.id}`);

        if(casado2) return message.quote(`:x: ${message.author} **|** **${marry.username}** já está casado, não esquenta, uma hora você consegue`);

        if(marry.id == message.author.id) return message.quote(`:x: ${message.author} **|** ${idioma.marry.vc}`);

        if(marry.id == client.user.id) return message.quote(`:x: ${message.author} **|** ${idioma.marry.eu}`);

        message.quote(`💍 ${marry} **|** **${message.author.username}** ${idioma.marry.deseja}`).then(msg => {
          msg.react("✅").then(r => {

        const marryfilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === marry.id;
        
        msg.createReactionCollector(marryfilter, { time: 60000 }).on("collect", async r => {
          await client.db.set(`marry-${message.author.id}`, `${marry.id}`);
          await client.db.set(`marry-${marry.id}`, `${message.author.id}`);
          await client.db.set(`marryt-${message.author.id}`, Date.now());
          await client.db.set(`marryt-${marry.id}`, Date.now());
            msg.channel.send(`💍 Eu vos declaro casados`).then(m => { // OLHA O ERRO DE TRADUÇÃO LKKKKKKKKKKKKKKKK
            m.react("🥳")
            })

          })

        })
      })
    }
  }
  
  //ADG
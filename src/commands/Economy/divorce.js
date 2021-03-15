module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'divorciar',
          categoria: '💸 • Economia',
          desc: 'Se divorcia de seu amor'
        },
        en: {
          nome: 'divorce',
          categoria: '💸 • Economy',
          desc: 'Divorces your love'
        },
      aliases: ['divorce', 'separar', 'divorciar'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
      const msg = message;
      const casamento = await client.db.get(`marry-${msg.author.id}`);

      if(!casamento) return;

      const casamentos = await client.users.fetch(casamento)

        message.quote(`💍 ${msg.author} **|** Você deseja se separar de **${casamentos.username}**?`).then(msg2 => {
          msg2.react("✅").then(r => {

        const marryfilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === msg.author.id;
        
        msg2.createReactionCollector(marryfilter, { time: 60000 }).on("collect", async r => {
          await client.db.delete(`marry-${msg.author.id}`)
          await client.db.delete(`marry-${casamentos.id}`)

            msg.channel.send(`💍 Nem tudo são flores, espero que encontre seu verdadeiro amor`).then(m => {
            
            casamentos.send(`💍 Infelizmente seu amor **${msg.author.username}** decidiu se separar, nem tudos são flores, você irá encontrar seu verdadeiro amor`).catch((e) => {
              console.log("[DIVORCIO] DM fechada, bruh")
            })

            m.react("💔")

            })

          })

        })
      })
    }
  }
  
  //ADG
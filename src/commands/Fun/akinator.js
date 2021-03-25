module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'akinator',
          categoria: '🤣 • Fun',
          desc: 'Jogue Akinator no Discord'
        },
        en: {
          nome: 'akinator',
          categoria: '🤣 • Fun',
          desc: 'Akinator Game'
        },
      aliases: ['aki', 'akinator'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
        const akinator = new Set();

        if(akinator.has(message.author.id)) return message.quote("você já está jogando")

        if(!akinator.has(message.author.id)) {
            akinator.add(message.author.id)
        }

        message.quote(`⏰ ${message.author} **|** ${idioma.aki.i}...`).then(async m2 => {
        const { MessageCollector } = require("discord.js-collector");

        const { Aki } = require('aki-api');
        const region = idioma.aki.reg;
        const aki = new Aki(region);
        await aki.start();
        
        const akii = function() {

        const embed = new (require("discord.js")).MessageEmbed()
        .setAuthor('Akinator', 'https://i.imgur.com/eyo9wd2.jpg')
        .addField(`${idioma.aki.q}`, aki.question)
        .addField(`${idioma.aki.r}`, aki.answers)
        .addField(`Progresso:`, aki.progress)
        .setColor('YELLOW')
        
            message.quote(embed).then(async botMessage => {
            m2.delete()

            const userMessage = await MessageCollector.asyncQuestion({
                botMessage,
                user: message.author.id,
              });
              
              client.aki = {}

              if(userMessage.content.toLowerCase('sim', 'yes', 'y', 's')) {
                  client.aki.answer = 0
              }

              if(message.content.toLowerCase('não', 'no', 'n')) {
                client.aki.answer = 1
              }

              const myAnswer = 0;

              await aki.step(client.aki.answer).then(async akiii => {
                if (aki.progress >= 70 || aki.currentStep >= 78) {
                    await aki.win();
                    console.log('firstGuess:', aki.answers);
                    console.log('guessCount:', aki.guessCount);
                }
                akii()
              })

            })
        }

        akii()
        })
    }
  }
  
  //Nome de quem fez ou ajudou
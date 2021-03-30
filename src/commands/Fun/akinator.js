module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['EMBED_LINKS'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
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
        const emojis = ["👍", "👎", "❓", "🤔", "🙄", "❌"];
        const {MessageEmbed} = require("discord.js")
        const akinator = new Set();

        if(akinator.has(message.author.id)) return message.quote("você já está jogando")

        if(!akinator.has(message.author.id)) {
            akinator.add(message.author.id)
        }

        message.quote(`⏰ ${message.author} **|** ${idioma.aki.i}...`).then(async m2 => {
          message.channel.startTyping()
        const { Aki } = require('aki-api');
        const region = idioma.aki.reg;
        const aki = new Aki(region);
        await aki.start();

        const embed = new (require("discord.js")).MessageEmbed()
        .setTitle(`${idioma.aki.q} ${aki.currentStep + 1}`)
        .setColor("YELLOW")
        .setThumbnail("https://i.imgur.com/eyo9wd2.jpg")
        .addField(`${aki.question}`, `${aki.answers.map((an, i) => `${emojis[i]} → ${an}`).join("\n")}`)
        .setColor('YELLOW')
        
            message.quote(embed).then(async msg => {
            m2.delete()
            message.channel.stopTyping()
            for (const emoji of emojis) await msg.react(emoji);
            const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id == message.author.id, {
              time: 60000 * 6
            });
        
            collector
              .on("end", () => akinator.delete(message.author.id))
              .on("collect", async ({
                emoji,
                users
              }) => {
                users.remove(message.author).catch(() => null);
        
                if (emoji.name == "❌") return collector.stop();
        
                await aki.step(emojis.indexOf(emoji.name));
        
                if (aki.progress >= 80 || aki.currentStep >= 78) {
        
                  await aki.win();
        
                  collector.stop();
        
                  message.channel.send(new MessageEmbed()
                    .setTitle(idioma.aki.is)
                    .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\nRank: **#${aki.answers[0].ranking}**\n\n${idioma.aki.res}`)
                    .setImage(aki.answers[0].absolute_picture_path)
                    .setThumbnail("https://i.imgur.com/eyo9wd2.jpg")
                    .setColor("YELLOW"));
        
                  const filter = m => /(yes|no|y|n|sim|s)/i.test(m.content) && m.author.id == message.author.id;
        
                  message.channel.awaitMessages(filter, {
                      max: 1,
                      time: 30000,
                      errors: ["time"]
                    })
                    .then(collected => {
                      const isWinner = /yes|y|sim|s/i.test(collected.first().content);
                      message.channel.send(new MessageEmbed()
                        .setTitle(isWinner ? idioma.aki.win : idioma.aki.nowin)
                        .setColor("YELLOW")
                        .setThumbnail("https://i.imgur.com/eyo9wd2.jpg")
                        .setDescription(idioma.aki.yay));
                    }).catch(() => null);
                
                } else {
                  msg.edit(new MessageEmbed()
                  .setTitle(`${idioma.aki.q} ${aki.currentStep + 1}`)
                  .setColor("YELLOW")
                  .setThumbnail("https://i.imgur.com/eyo9wd2.jpg")
                  .addField(`${aki.question}`, `${aki.answers.map((an, i) => `${emojis[i]} → ${an}`).join("\n")}`)
                  .setColor('YELLOW'))
                }
              });
            })
          })
    }
  }
  
  //Nome de quem fez ou ajudou
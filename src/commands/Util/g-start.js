module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: true //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'giveaway',
          categoria: '🪓 • Util',
          desc: 'Descrição'
        },
        en: {
          nome: 'giveaway',
          categoria: '🪓 • Util',
          desc: 'Description'
        },
      aliases: ['giveaway', 'sorteio', 'g-start'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
        const ms = require("ms")

        if(!args[0]) return message.quote(`${idioma.giveaway.start.replace("%p", prefixoCerto)}`)
        if(!args[1]) return message.quote(`${idioma.giveaway.start.replace("%p", prefixoCerto)}`)
        if(!args[2]) return message.quote(`${idioma.giveaway.start.replace("%p", prefixoCerto)}`)

        client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(' '),
            winnerCount: parseInt(args[1]),
            messages: {
                giveaway: `🎉🎉 **${idioma.giveaway.give}** 🎉🎉`,
                giveawayEnded: `🎉🎉 **${idioma.giveaway.giveend}** 🎉🎉`,
                timeRemaining: `${idioma.giveaway.restante} **{duration}**!`,
                inviteToParticipate: idioma.giveaway.react,
                winMessage: 'Congratulations, {winners}! You won **{prize}**!\n{messageURL}',
                embedFooter: client.user.username,
                noWinner: idioma.giveaway.no,
                hostedBy: 'Hosted by: {user}',
                winners: 'winner(s)',
                endedAt: 'Ended at',
                units: {
                    seconds: idioma.giveaway.sec,
                    minutes: idioma.giveaway.min,
                    hours: idioma.giveaway.hrs,
                    days: idioma.giveaway.day,
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });

    }
  }
  
  //Nome de quem fez ou ajudou
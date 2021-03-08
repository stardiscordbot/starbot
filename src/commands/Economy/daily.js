module.exports = class DailyCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'daily',
          categoria: '💸 • Economia',
          desc: 'Descrição'
        },
        en: {
          nome: 'daily',
          categoria: '💸 • Economy',
          desc: 'Description'
        },
      aliases: ['diario', 'd'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixoCerto, idioma) {
        const economy = require("../../config/database/mongodb/economy");

        const ms = require("parse-ms");

        let user = message.author;

        let timeout = 86400000;
        let amount = 200;

        economy.findOne({ User: user.id }, async(err, data)=>{
            if(!data) {

                let newEconomy = new economy({
                    User: user.id,
                    Money: amount,
                    Bank: 0,
                    Tag: message.author.tag,
                    DailyTime: Date.now()
                })

                newEconomy.save();

                message.quote(`💸 ${message.author} **|** ${idioma.daily.coletado.replace("%m", amount)}`)

            } else {
                if (data.DailyTime !== null && timeout - (Date.now() - data.DailyTime) > 0) {
                  let time = ms(timeout - (Date.now() - data.DailyTime));

                  message.quote(`:x: ${message.author} **|** ${idioma.daily.coletou.replace("%th", time.hours).replace("%tm", time.minutes).replace("%ts", time.seconds)}`)
                } else {
                  data.Money = data.Money + amount;
                  data.DailyTime = Date.now();
                  data.save()

                  message.quote(`💸 ${message.author} **|** ${idioma.daily.coletado.replace("%m", amount)}`)
              }
            }
        })

    }
  }
  
//ADG
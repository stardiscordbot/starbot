module.exports = class PayCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'pay',
          categoria: '💸 • Economia',
          desc: 'Você está bem rico, que tal pagar, você pode comprar alguma coisa! Lembre-se que não é permitido vender coisas que valem dinheiro real'
        },
        en: {
          nome: 'pay',
          categoria: '💸 • Economia',
          desc: 'You are very rich, how about paying, you can buy something! Remember that it is not allowed to sell things that are worth real money'
        },
      aliases: ['pagar'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
        const economy = require("../../config/database/mongodb/economy");
        if(!args[0]) return message.quote(`:x: ${message.author} **|** ${idioma.pay.noargs.replace("%p", prefixoCerto)}`)
        if(!args[1]) return message.quote(`:x: ${message.author} **|** ${idioma.pay.noargs.replace("%p", prefixoCerto)}`)
        const user = message.mentions.users.first() || await client.users.fetch(args[0]);
        if(!user) return message.quote(`:x: ${message.author} **|** ${idioma.avatar.unknown}`)
        const quantia = args[1].replace(/`/g, '')
        if(isNaN(quantia)) return message.quote(`:x: ${message.author} **|** ${idioma.pay.nan.replace("%q", quantia)}`)

        if(user.id == message.author.id) return message.quote(`:x: ${message.author} **|** ${idioma.pay.vc}`)

        economy.findOne({ User: message.author.id}, async(err, data)=>{
            if(!data) return message.quote(`:x: ${message.author} **|** ${idioma.pay.no}`)
            if(data.Money < args[1]) return message.quote(`:x: ${message.author} **|** ${idioma.pay.no}`)
            economy.findOne({ User: user.id}, async(err,data2) => {
            message.quote(`💸 ${message.author} **|** ${idioma.pay.c.replace("%m", user.username).replace("%q", args[1])}`).then(msg => {
                msg.react("✅")
                const filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                msg.createReactionCollector(filter, { time: 60000 }).on("collect", async r => {
                    data.Money = eval(data.Money - args[1])
                    data.save()
                    if(data2) {
                        data2.Money = eval(data2.Money + args[1])
                        data2.save()
                    }
                    if(!data2) {
                        let newEconomy = new economy({
                            User: user.id,
                            Money: args[1],
                            Bank: 0,
                            Tag: message.author.tag,
                        })
                        newEconomy.save();
                    }
                    message.quote(`💸 ${message.author} **|** ${idioma.pay.s.replace("%m", user.username).replace("%q", args[1])}`)
                })
                })
            })
        })
    }
}
  
  //ADG
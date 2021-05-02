module.exports = class PremiumCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: [],
          dono: true
        },
        pt: {
          nome: 'setpremium',
          categoria: '💻 • Developer',
          desc: 'Seta o premium de algum usuário'
        },
        en: {
          nome: 'setpremium',
          categoria: '💻 • Developer',
          desc: 'Set a user\'s premium'
        },
        aliases: ['premium', 'spremium'],
        run: this.run
      }
    }
    async run(client, message, args, prefixoCerto) {
        const vipschema = require("../../config/database/mongodb/vip")
        if(!args[0]) return message.quote(`:x: ${message.author} **|** Mencione algum usuário para dar o premium`)
        const u = message.mentions.users.first() || await client.users.fetch(args[0])
        if(!u) return message.quote(`:x: ${message.author} **|** Usuário desconhecido.`)
        const emb = new (require("discord.js")).MessageEmbed()
        .setTitle(`<:st_vip:830838734467498014> SetVip`)
        .setDescription(`${message.author} ok, escolha o vip que quer dar para **${u.username}**`)
        .addField(`:one: Star:tm: | Basic (R$5)`, `~ **Vantagens:**\n• Acesso a <:st_music_djmiku:829757709266976879> **DJ Star:tm:**;\n• Bônus de x1.25 Yens diários.`, true)
        .addField(`:two: Star:tm: | Ouro (R$10)`, `~ **Vantagens:**\n• Todas as anteriores;\n• Irá aparecer no \`s!doadores\`;\n• + Bônus de x1.5 de Yens diários;\n• Background personalizado em seu perfil.`, true)
        .setColor("GREEN")
        message.quote(message.author, emb).then(msg => {
            msg.react("1️⃣")
            msg.react("2️⃣")
            const basicfilter = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
            const goldfilter = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
            const basic = msg.createReactionCollector(basicfilter, { time: 60000 });
            const gold = msg.createReactionCollector(goldfilter, { time: 60000 });

            basic.on('collect', r => {
                vipschema.findOne({User:u.id}, async (err,data) => {
                    if(!data) {
                        let newvip = new vipschema({
                            User: u.id,
                            Vip: "basic",
                            Time: Date.now(),
                        })
                        newvip.save()
                    } 
                    if(data) {
                        data.Vip = "basic"
                        data.Time = Date.now()
                        data.save()
                    }
                })
            msg.delete()
            message.quote(`💸 ${message.author} **|** Sucesso, **${u.username}** recebeu **Star:tm: | Basic (R$5)** com duração de **1 mês**`)
            let succes = new (require("discord.js")).MessageEmbed()
            .setTitle(`💸 Pagamento Aprovado`)
            .setDescription(`Olá, **${u.username}**, obrigado pela compra, com isso você me ajuda a ficar online, para que eu possa continuar espalhando alegria e felicidade pelo discord!\n\nSe você não sabe o motivo de ter recebido essa mensagem, saiba que é pelo vip que você adquiriu (caso não tenha adquirido nada alguem te presenteou :D)`)
            .setColor("GREEN")
            .setImage("https://i.imgur.com/N4MIPUv.jpeg")
            u.send(succes)
            })
            gold.on('collect', r => {
                vipschema.findOne({User:u.id}, async (err,data) => {
                    if(!data) {
                        let newvip = new vipschema({
                            User: u.id,
                            Vip: "gold",
                            Time: Date.now(),
                        })
                        newvip.save()
                    } 
                    if(data) {
                        data.vip = "gold"
                        data.Time = Date.now()
                        data.save()
                    }
                })
                msg.delete()
                message.quote(`💸 ${message.author} **|** Sucesso, **${u.username}** recebeu **Star:tm: | Ouro (R$10)** com duração de **1 mês**`)
                let succes = new (require("discord.js")).MessageEmbed()
                .setTitle(`💸 Pagamento Aprovado`)
                .setDescription(`Olá, **${u.username}**, obrigado pela compra, com isso você me ajuda a ficar online, para que eu possa continuar espalhando alegria e felicidade pelo discord!\n\nSe você não sabe o motivo de ter recebido essa mensagem, saiba que é pelo vip que você adquiriu (caso não tenha adquirido nada alguem te presenteou :D)`)
                .setColor("GREEN")
                .setImage("https://i.imgur.com/N4MIPUv.jpeg")
                u.send(succes)
            })

        })
    }
  }
  
  // ADG
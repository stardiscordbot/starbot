module.exports = class EvalCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: [],
          dono: true
        },
        pt: {
          nome: 'empregos',
          categoria: '💸 • Economia',
          desc: 'Pega seu bonûs diário'
        },
        en: {
          nome: 'jobs',
          categoria: '💸 • Economy',
          desc: 'Take you daily bonûs'
        },
        aliases: ['emprego', 'job'],
        run: this.run
      }
    }
    async run(ctx) {
        const trabalho = await db.get(`work-${ctx.message.author.id}`);
        const empregos = require("../../System/empresas.json");

        if(!trabalho) {
            let embed = new star.manager.ebl;
            embed.title(`👷 Jobs | ${star.user.username}`)
            embed.description(`> 💸 Está pronto para entrar na economia RP da **${star.user.username}**? Escolha um emprego:`)
            embed.field(`🚗 ❯ Motorista:`, `<:st_util_info:835532528617259068> **Requisitos:**\n> Uma Carteira de motorista.\n> Salário: **500** a **2,000**`, true)
            embed.field(`👮 ❯ Policial:`, `<:st_util_info:835532528617259068> **Requisitos:**\n> Um coração frio e coragem\n> Salário: **500** a **10,000**\n**⚠️ PROFISSÃO ARRISCADA**`, true)
            embed.field(`🙋 ❯ Atendente:`, `<:st_util_info:835532528617259068> **Requisitos:**\n> Paciência de jó.\n> Salário: **500** a **5,000**`, true)
            embed.color('#dd3af0')
            embed.thumbnail(ctx.message.author.avatarURL || star.user.avatarURL)
            ctx.message.channel.createMessage(ctx.message.author, embed.create).then(msg => {
                msg.addMessageReaction("🚗");
                msg.addMessageReaction("👮");
                msg.addMessageReaction("🙋");

                const motorfilter = (addMessageReactionion, user) => addMessageReactionion.emoji.name === '🚗' && user.id === ctx.message.author.id;
                const polifilter = (addMessageReactionion, user) => addMessageReactionion.emoji.name === '👮' && user.id === ctx.message.author.id;
                const atenfilter = (addMessageReactionion, user) => addMessageReactionion.emoji.name === '🙋' && user.id === ctx.message.author.id;

                const motorista = msg.createaddMessageReactionionCollector(motorfilter, { time: 60000 });
                const policial = msg.createaddMessageReactionionCollector(polifilter, { time: 60000 });
                const atendente = msg.createaddMessageReactionionCollector(atenfilter, { time: 60000 });
                motorista.on("collect", addMessageReactionion => {
                    policial.stop()
                    atendente.stop()
                    motorista.stop()
                    let empresa = empregos.pt.motorista[Math.floor(Math.random() * empregos.pt.motorista.length)]
                    msg.delete()
                        let embed = new star.manager.ebl;
                        embed.title(`👷 Jobs | ${star.user.username}`)
                        embed.description(`<:st_util_info:835532528617259068> Você foi contratado como **motorista** na empresa **${empresa.name}**\n> **Especificações:**\n- Salário: **¥ ${empresa.salario.min}/¥ ${empresa.salario.max}**`)
                        embed.color('#dd3af0')
                        embed.thumbnail(ctx.message.author.avatarURL || star.user.avatarURL)
                        ctx.message.channel.createMessage(embed.create)
                })
            })
        } else {
            let embed = new star.manager.ebl;
            embed.title(`👷 Jobs | ${star.user.username}`)
            embed.description(`> 💸 Você está feliz com seu emprego atual? Se não aqui tem alguns empregos que você pode seguir.`)
            embed.field(`👨‍✈️ ❯ Piloto:`, `<:st_util_info:835532528617259068> Esse emprego exige que você tire muitas carteiras para poder trabalhar!\n> Salário: 3,000 a 40,000`)
            embed.field(`💻 ❯ Programador:`, `<:st_util_info:835532528617259068> Profissão extressante!\n> Salário: 5,000 a 100,000`)
            embed.field(`👷 ❯ Engenheiro:`, `<:st_util_info:835532528617259068> Profissão`)
            embed.color('#dd3af0')
            embed.thumbnail(ctx.message.author.avatarURL || star.user.avatarURL)
            ctx.message.channel.createMessage(ctx.message.author, embed.create).then(msg => {
                msg.addMessageReaction("👨‍✈️");
                msg.addMessageReaction("💻");
                msg.addMessageReaction("👷");
            })
        }
        
    }
}
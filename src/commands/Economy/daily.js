module.exports = class DailyCommand {
    constructor() {
      return {
        permissoes: {
          membro: [],
          bot: ['embedLinks'],
          dono: false
        },
        pt: {
          nome: 'daily',
          categoria: '💸 • Economia',
          desc: 'Pega seu bonûs diário'
        },
        en: {
          nome: 'daily',
          categoria: '💸 • Economy',
          desc: 'Take you daily bonûs'
        },
        aliases: ['diario', 'dd'],
        run: this.run
      }
    }
    async run(ctx) {
        const timeout = 86400000;
        const moment = require("moment");
        const daily = Math.floor(Math.random() * 6500) + 1000; //Minimo 1000, Máximo 7500
        const dailytime = await db.get(`dailytime-${ctx.message.author.id}`);

        if(!dailytime) {
            await db.set(`money-${ctx.message.author.id}`, daily)
            await db.set(`dailytime-${ctx.message.author.id}`, Date.now())

            let embed = new star.manager.ebl;
            embed.title(`💸 Daily | ${star.user.username}`)
            embed.description(`🌟 **${ctx.message.author.username}** ${ctx.idioma.daily.coletado.replace("%m", daily)}`)
            embed.color('#dd3af0')
            embed.thumbnail(star.user.avatarURL)

            ctx.send(embed.create)
        } else {
            if(dailytime !== null && timeout - (Date.now() - dailytime) > 0) {
                let tt = moment(timeout - (Date.now() - dailytime)).format('HH:mm:ss')

                let embed = new star.manager.ebl;
                embed.title(`💸 Daily | ${star.user.username}`)
                embed.description(`<:st_util_info:835532528617259068> **${ctx.message.author.username}** ${ctx.idioma.daily.coletou.replace("%time", tt)}.`)
                embed.color('#dd3af0')
                embed.thumbnail(star.user.avatarURL)

                ctx.send(embed.create)
            } else {
                let q = await db.get(`money-${ctx.message.author.id}`)
                await db.set(`money-${ctx.message.author.id}`, daily + q)
                await db.set(`dailytime-${ctx.message.author.id}`, Date.now())
                await db.set(`banco-${ctx.message.author.id}`, 0)

                let embed = new star.manager.ebl;
                embed.title(`💸 Daily | ${star.user.username}`)
                embed.description(`🌟 **${ctx.message.author.username}** ${ctx.idioma.daily.coletado.replace("%m", daily)}`)
                embed.color('#dd3af0')
                embed.thumbnail(star.user.avatarURL)
                ctx.send(embed.create)
            }
        }
        
    }
}
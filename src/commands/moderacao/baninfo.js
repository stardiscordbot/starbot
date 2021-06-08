module.exports = class PingCommand {
    constructor() {
        return {
            permissoes: {
                membro: ['banMembers'], //Permissoes que o usuario necessita
                bot: ['banMembers'], //Permissoes que o bot necessita
                dono: true //Se apenas nos devs podem usar o comando
            },
            pt: {
                nome: 'baninfo',
                categoria: '🔨 • Moderação',
                desc: 'Veja a informação de algum ban'
            },
            en: {
                nome: 'baninfo',
                categoria: '🔨 • Moderation',
                desc: 'View a baninfo'
            },
            aliases: ['checkban', 'infoban', 'informação-ban', 'ban-info'],
            run: this.run
        };
    }
    async run(ctx) {
        let member
        if (!ctx.args[0]) return ctx.send(`:x: ${ctx.message.author.mention} **|** ${ctx.idioma.ban.noarg}`)

        if (!ctx.message.mentions[0]) {
            member = await star.getRESTUser(ctx.args[0]).then(info => info).catch(() => {
                const embed = new star.manager.ebl;
                embed.title(`${ctx.idioma.message.e}`)
                embed.description(`\`\`\`js\n${err}\n\`\`\``)
                embed.field(`${ctx.idioma.message.e2}`, `${ctx.idioma.message.e3}`)
                embed.color('#ff0000')
                embed.thumbnail(star.user.avatarURL)
                return ctx.send(embed.create)
                });
        } else {
            member = await ctx.message.mentions[0];
        }
        const banInfo = await ctx.message.channel.guild.getBan(member.id).catch((e) => {
            const embed = new star.manager.ebl;
            embed.title(`${ctx.idioma.message.e}`)
            embed.description(`\`\`\`js\n${e}\n\`\`\``)
            embed.field(`${ctx.idioma.message.e2}`, `${ctx.idioma.message.e3}`)
            embed.color('#ff0000')
            embed.thumbnail(star.user.avatarURL)
            return ctx.send(embed.create)
        })

        const embed = new star.manager.ebl;
        embed.title(`🔨 BanInfo • ${member.username}#${member.discriminator}`)
        embed.color('#dd3af0')
        embed.field(`${ctx.idioma.baninfo.user}`, `\`\`\`${member.username}#${member.discriminator} (${member.id})\`\`\``)
        embed.field(`${ctx.idioma.baninfo.reason}`, `\`\`\`${banInfo.reason}\`\`\``)
        embed.thumbnail(member.avatarURL)
        ctx.send(embed.create)
    }
};

//ADG, Davi e LRD
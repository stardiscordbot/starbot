module.exports = class Autorole {
    constructor() {
      return {
        permissoes: {
          membro: ['manageGuild'],
          bot: ['manageRoles']
        },
        pt: {
          nome: 'autorole',
          categoria: '⚙️ • Configuração',
          desc: 'Dê cargos automaticamente para novos em seu servidor (seja bots ou memberos) quando eles entrarem no servidor.' 
        },
        en: {
          nome: 'autorole',
          categoria: '⚙️ • Configuration',
          desc: 'Automatically assign roles to new ones on your server (whether bots or members) when they join the server.'
        },
        aliases: ['autocargo', 'role', 'auto', 'joinrole', 'autojoin', 'auto-role', 'join-role', 'auto-cargo', 'role-auto'],
        run: this.run
      }
    }
    async run(ctx) {
        //COLETORES
        const ReactionCollector = require("../../Helpers/ReactionCollector");
        const MessageCollector = require("../../Helpers/MessageCollector");
        //PUXANDO O AUTOROLE
        const autoroleuser = await db.get(`autoroleuser-${ctx.message.guildID}`);
        const autorolebot = await db.get(`autorolebot-${ctx.message.guildID}`);
        //CRIANDO A EMBED
        const embed = new star.manager.ebl;
        embed.title(`📋 Autorole | ${star.user.username}`)
        //FIELD AUTOROLE-BOT
        if(autorolebot) {
            //SE TIVER CARGOS
            embed.field(`🤖 Bot`, `${autorolebot.map((id) => `<@&${id}>`).join(', ')}`, true)
        } else {
            //SE NÃO TIVER
            embed.field(`🤖 Bot`, `Não Definido`, true)
        }
        //FIELD AUTOROLE-USER
        if(autoroleuser) {
            //SE TIVER CARGOS
            embed.field(`<:st_membros:845390325638889482> Membros`, `${autoroleuser.map((id) => `<@&${id}>`).join(', ')}`, true)
        } else {
            //SE NÃO TIVER
            embed.field(`<:st_membros:845390325638889482> Membros`, `Não Definido`, true)
        }
        //COR DA EMBED
        embed.color('#dd3af0')
        //CRIANDO OS NEGOCIO
        ctx.message.channel.createMessage(embed.create).then(msg => {
            //ADICIONANDO REAÇÕES
            msg.addReaction("🤖")
            msg.addReaction(":st_membros:845390325638889482")
            //CRIANDO COLETOR DE AUTOROLE BOT
            const bot = new ReactionCollector(msg, {
                user: ctx.message.author,
                ignoreBot: true,
                emoji: '🤖',
                time: 60000,
                max: 1,
                acceptReactionRemove: false,
                stopOnCollect: true,
            });
            //CRIANDO COLETOR DE AUTOROLE USER
            const user = new ReactionCollector(msg, {
                user: ctx.message.author,
                ignoreBot: true,
                emoji: 'st_membros',
                time: 60000,
                max: 1,
                acceptReactionRemove: false,
                stopOnCollect: true,
            });
            //CASO O USER COLOQUE O AUTOROLE DE BOT
            bot.on('collect', (message) => {
                msg.delete()
                message.channel.createMessage(`:white_check_mark: ${ctx.message.author.mention} **|** Mencione o cargo que será dado quando algum BOT entrar no servidor.`).then(m => {
                    let mcol = new MessageCollector(m.channel, {
                        user: ctx.message.author,
                        time: 60000,
                        ignoreBots: true,
                    });
                    mcol.on("collect", async (message) => {
                        message.delete()
                        let addrole = []
                        message.roleMentions.map(async (rol) => {
                            addrole.push(rol)
                        })
                        const embed2 = new star.manager.ebl;
                        embed2.title(`📋 Autorole | ${star.user.username}`)
                        embed2.description(`:white_check_mark: ${ctx.message.author.mention} **|** O Autorole user foi setado para: ${addrole.map((rolee) => `<@&${rolee}>`).join(', ')}`)
                        embed2.color('#dd3af0')
                        message.channel.createMessage(embed2.create)
                        if(!autorolebot) {
                            await db.set(`autorolebot-${ctx.message.guildID}`, [])
                            addrole.map(async auto => {
                                await db.push(`autorolebot-${ctx.message.guildID}`, auto)
                            })
                        } else {
                            await db.del(`autorolebot-${ctx.message.guildID}`)
                            await db.set(`autorolebot-${ctx.message.guildID}`, [])
                            addrole.map(async auto => {
                                await db.push(`autorolebot-${ctx.message.guildID}`, auto)
                            })
                        }
                        m.delete()
                    })
                })
            });
            //CASO O USER COLOQUE O AUTOROLE DE USER
            user.on('collect', (message) => {
                msg.delete()
                message.channel.createMessage(`:white_check_mark: ${ctx.message.author.mention} **|** Mencione o cargo que será dado quando algum usuário entrar no servidor.`).then(m => {
                    let mcol = new MessageCollector(m.channel, {
                        user: ctx.message.author,
                        time: 60000,
                        ignoreBots: true,
                    });
                    mcol.on("collect", async (message) => {
                        message.delete()
                        let addrole = []
                        message.roleMentions.map(async (rol) => {
                            addrole.push(rol)
                        })
                        const embed3 = new star.manager.ebl;
                        embed3.title(`📋 Autorole | ${star.user.username}`)
                        embed3.description(`:white_check_mark: ${ctx.message.author.mention} **|** O Autorole user foi setado para: ${addrole.map((rolee) => `<@&${rolee}>`).join(', ')}`)
                        embed3.color('#dd3af0')
                        message.channel.createMessage(embed3.create)
                        if(!autoroleuser) {
                            await db.set(`autoroleuser-${ctx.message.guildID}`, [])
                            addrole.map(async auto => {
                                await db.push(`autoroleuser-${ctx.message.guildID}`, auto)
                            })
                        } else {
                            await db.del(`autoroleuser-${ctx.message.guildID}`)
                            await db.set(`autoroleuser-${ctx.message.guildID}`, [])
                            addrole.map(async auto => {
                                await db.push(`autoroleuser-${ctx.message.guildID}`, auto)
                            })
                        }
                        m.delete()
                    })
                })
            })
        })
    }
}
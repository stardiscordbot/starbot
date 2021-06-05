'use strict';

const config = require('../../src/config/config');
const cooldowns = {};

module.exports = class executarCMD {
    constructor() {
        return {
            nome: 'messageCreate',
            run: this.run
        }
    }

    async run(message) {
        if (message.channel.type === 'dm' || message.author.bot) return;

        let xpReward = Math.floor(Math.random() * 29) + 1;
        if (xpReward == 0) xpReward = 10

        let xp = await db.get(`xp-${message.guildID}-${message.author.id}`)
        let level = await db.get(`level-${message.guildID}-${message.author.id}`) || 0
        let level2 = level + 1
        let levels = level2 * 1000

        if (!xp) {
            await db.set(`xp-${message.guildID}-${message.author.id}`, xpReward)
        } else {
            await db.set(`xp-${message.guildID}-${message.author.id}`, xp + xpReward)
        }

        if (xp > levels) {
            const cg = await db.get(`cargo-${message.guildID}-${level + 1}`)
            await db.set(`level-${message.guildID}-${message.author.id}`, level + 1)
            let lv = level + 1

            if (cg) {
                //const role = await message.guild.roles.cache.get(cg)
                //message.member.roles.add(role, 'XP Role')
                //message.channel.createMessage(`🥳 ${message.author.mention} **|** Você avançou para o nível **${lv}**!`)
            } else {
                //message.channel.createMessage(`🥳 ${message.author.mention} **|** Você avançou para o nível **${lv}**!`)
            }

        }
        const messages = await db.get(`messages-${message.guildID}-${message.author.id}`)
        if (messages) {
            await db.set(`messages-${message.guildID}-${message.author.id}`, messages + 1)
        } else {
            await db.set(`messages-${message.guildID}-${message.author.id}`, 1)
        }
        var prefix = config.prefix;
        const preDb = await db.get(`prefix-${message.guildID}`);
        if (preDb) {
            prefix = preDb;
        } else {
            prefix.map(pre => {
                if (message.content.startsWith(pre)) {
                    return prefix = pre;
                }
            })
        }

        if (message.content.startsWith(`<@!${star.user.id}>`)) {
            prefix = `<@!${star.user.id}>`;
        };

        // Definindo idioma.
        var idioma = require('../config/idiomas.js');
        var lang = (await db.get(`idioma-${message.guildID}`)) || 'pt_br';
        lang = lang.replace(/-/g, '_');
        idioma = idioma[lang];

        // Responder menção.
        if (message.content === `<@!${star.user.id}>`) {
            return message.channel.createMessage(idioma.mention.response.replace('%u', message.author.username).replace("s!", prefix));
        }

        // Executar comando.  
        if (message.content.startsWith(prefix)) {
            //const bot = message.guild.me

            if (!message.channel.guild.members.get(star.user.id).permissions.has('readMessageHistory')) {
                return message.channel.createMessage(':x: Eu não tenho permissão de ler o histórico de mensagens!')
            }

            const argumentos = message.content.slice(prefix.length).trim().split(/ +/);
            const cmd = argumentos.shift().toLowerCase();
            const command = star.commands.get(cmd) || star.aliases.get(cmd);

            if (!command) {
                if (await db.get(`mensagem-comando-${message.guildID}`)) {
                    message.channel.createMessage(`O Comando ${cmd.replace(/@/g, '').replace(/#/g, '').replace(/`/g, '')} não existe ou não pode ser executado no momento!`)
      } else {
        return;
      }
    }

    if (command.permissoes) {
      if (!command.permissoes.membro == []) {
        if (!command.permissoes.membro.every(p => message.channel.guild.members.get(message.author.id).permissions.has(p)))  {
          return message.channel.createMessage(`:x: ${message.author.mention} ** | ** You don 't have all the necessary permissions to use this command!\nNeeded permissions: \`${command.permissoes.membro}\`.`);
                    }
                }
                if (!command.permissoes.bot == []) {
                    if (!command.permissoes.bot.every(p => message.channel.guild.members.get(star.user.id).permissions.has(p))) {
                        return message.channel.createMessage(`:x: ${message.author.mention} **|** I don't have all the necessary permissions to run this command!\nNeeded permissions: \`${command.permissoes.bot}\`.`);
                    }
                }
                if (command.permissoes.dono) {
                    // Verificar se o autor da mensagem é um desenvolvedor.
                    var developers = await db.get('devs');

                    if (!developers) {
                        await db.set('devs', ['717766639260532826', '630493603575103519']);
                    }

                    developers = developers.map(dev => {
                        return dev;
                    })

                    if (!developers.includes(message.member.id)) {
                        return message.channel.createMessage(`:x: ${message.author.mention} **|** Only my developers can use this command!`);
                    }
                }
            }

            try {
                // Caso tudo ocorra bem executar o comando.
                if (!cooldowns[message.author.id]) cooldowns[message.author.id] = {
                    lastCmd: null
                }
                let ultimoCmd = cooldowns[message.author.id].lastCmd
                if (ultimoCmd !== null && 5000 - (Date.now() - ultimoCmd) > 0) {
                    return message.channel.createMessage(`:x: ${message.author.mention} **|** Wait 5 seconds to use another command.`)
                } else {
                    cooldowns[message.author.id].lastCmd = Date.now()
                }

                const cmds = await db.get("comandos")
                if (!cmds) {
                    await db.set("comandos", 1)
                } else {
                    await db.set("comandos", cmds + 1)
                }

                this.ctx = {
                    id: message.id,
                    user: message.author,
                    userTag: message.author.tag,
                    userId: message.author.id,
                    member: message.member,
                    memberTag: message.member.tag,
                    memberId: message.member.id,
                    idioma: idioma,
                    prefix: prefix,
                    args: argumentos,
                    message: message,
                    embed: require('../client/lyaEmbedBuilder'),
                    // Functions
                    send: function(texto) {
                        message.channel.createMessage(texto);
                    },
                    reply: function(texto, mencionar) {
                        message.channel.createMessage(texto, mencionar);
                    },
                    addMessageReaction: function(emoji) {
                        message.addMessageReaction(emoji);
                    },
                    fetch: async function(url) {
                        await star.manager.fetch(url);
                    }
                }
                const owner = await star.getRESTUser(message.channel.guild.ownerID)
                const moment = require("moment")
                let embed2 = new star.manager.ebl;
                embed2.title("<:st_website:830841154203025439> Log de Comandos")
                embed2.field(`<:st_membros:845390325638889482> Usuário:`, `\`\`\`${message.author.username}#${message.author.discriminator} (${message.author.id})\`\`\``)
                embed2.field(`<:st_util_info:835532528617259068> Comando:`, `\`\`\`${message.content.slice(0, 1010)}\`\`\``)
                embed2.field(`<:st_link:845643800080416770> Link da mensagem:`, `\`\`\`${message.jumpLink}\`\`\``)
                embed2.field(`<:st_like:845646603368661002> GuildInfo:`, `\`\`\`📋 Nome: ${message.channel.guild.name}\n🧭 ID: ${message.channel.guild.id} [${message.channel.guild.shard.id}]\n👑 ${owner.username}#${owner.discriminator}\n🧑 Membros: ${message.channel.guild.memberCount}\n📅 Criado há dias/horas: ${moment(message.channel.guild.createdAt).format('📆 DD/MM/YY')}\n${moment(message.channel.guild.createdAt).format('⏰ HH:mm:ss')}\n🗺️ Região: ${message.channel.guild.region}\`\`\``)
                embed2.color('#dd3af0')
                embed2.thumbnail(message.channel.guild.iconURL || star.user.avatarURL)
                const log = await star.getRESTChannel("829530412350308392")
                log.createMessage(embed2.create)
                return command.run(this.ctx);
            } catch (erro) {
                // Informar o erro ao executar o comando.
                const embed = new star.manager.ebl;
                embed.title('Oops, an error happened!')
                embed.description(`\`\`\`js\n${erro}\n\`\`\``)
                embed.color('#ff0000')
                embed.thumbnail(star.user.avatarURL)
                return message.channel.createMessage(embed.create)
            }
        }
    }
}
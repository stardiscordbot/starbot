'use strict'

const config = require('../config/config')
const cooldowns = {}

module.exports = class MessageEvent {
  constructor () {
    return {
      nome: 'messageUpdate',
      run: this.run
    }
  }

  async run (oldMessage, newMessage) {
    const message = oldMessage
    if (oldMessage.content === newMessage.content) return
    if (message.channel.type === 'dm' || message.author.bot) return
    let xpReward = Math.floor(Math.random() * 29) + 1
    if (xpReward === 0) xpReward = 10

    // let xp = await global.db.get(`xp-${message.guildID}-${message.author.id}`)
    // let level = await global.db.get(`level-${message.guildID}-${message.author.id}`) || 0
    // let level2 = level + 1
    // let levels = level2 * 1000

    // if (!xp) {
    //   await global.db.set(`xp-${message.guildID}-${message.author.id}`, xpReward)
    // } else {
    //    await global.db.set(`xp-${message.guildID}-${message.author.id}`, xp + xpReward)
    // }
    /*
        if (xp > levels) {
            const cg = await global.db.get(`cargo-${message.guildID}-${level + 1}`)
            await global.db.set(`level-${message.guildID}-${message.author.id}`, level + 1)
            let lv = level + 1

            if (cg) {
                //const role = await message.guild.roles.cache.get(cg)
                //message.member.roles.add(role, 'XP Role')
                //message.channel.createMessage(`🥳 ${message.author.mention} **|** Você avançou para o nível **${lv}**!`)
            } else {
                //message.channel.createMessage(`🥳 ${message.author.mention} **|** Você avançou para o nível **${lv}**!`)
            }
        }
        */
    const messages = await global.db.get(`messages-${message.guildID}-${message.author.id}`)
    if (messages) {
      await global.db.set(`messages-${message.guildID}-${message.author.id}`, messages + 1)
    } else {
      await global.db.set(`messages-${message.guildID}-${message.author.id}`, 1)
    }
    let prefix = config.prefix
    const preDb = await global.db.get(`prefix-${message.guildID}`)
    if (preDb) {
      prefix = preDb
    } else {
      prefix.forEach(pre => {
        if (message.content.startsWith(pre)) {
          prefix = pre
        }
      })
    }

    if (message.content.startsWith(`<@!${global.star.user.id}>`)) {
      prefix = `<@!${global.star.user.id}>`
    };
    if (message.content.startsWith(`<@${global.star.user.id}>`)) {
      prefix = `<@${global.star.user.id}>`
    }

    // Definindo idioma.
    let idioma = require('../config/idiomas.js')
    let lang = (await global.db.get(`idioma-${message.guildID}`)) || 'pt_br'
    lang = lang.replace(/-/g, '_')
    idioma = idioma[lang]

    // Responder menção.
    if (message.content === `<@!${global.star.user.id}>` || message.content === `<@${global.star.user.id}>`) {
      const pr = await global.db.get(`prefix-${message.guildID}`) || 's!'
      const embed = new global.star.manager.Ebl()
      embed.title(`<:st_wumpus:844541072855662593> ${idioma.message.P}`)
      embed.color('#dd3af0')
      embed.thumbnail(global.star.user.avatarURL)
      embed.description(idioma.mention.response.replace('%u', message.author.username).replace('s!', pr))
      return message.channel.createMessage(embed.create)
    }

    // Executar comando.
    if (message.content.startsWith(prefix)) {
      // const bot = message.guild.me

      if (!message.channel.guild.members.get(global.star.user.id).permissions.has('readMessageHistory')) {
        return message.channel.createMessage(`:x: ${idioma.message.view}`)
      }

      const argumentos = message.content.slice(prefix.length).trim().split(/ +/)
      const cmd = argumentos.shift().toLowerCase()
      const command = global.star.commands.get(cmd) || global.star.aliases.get(cmd)

      if (!command) {
        if (await global.db.get(`mensagem-comando-${message.guildID}`)) {
          message.channel.createMessage(`:x: ${message.author} **|** ${idioma.message.the} \`${cmd.replace(/@/g, '').replace(/#/g, '').replace(/`/g, '')}\` ${idioma.message.unk}`)
        } else {
          return
        }
      }

      if (command.permissoes) {
        if (!command.permissoes.membro === []) {
          if (!command.permissoes.membro.every(p => message.channel.guild.members.get(message.author.id).permissions.has(p))) {
            return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.user} \`${command.permissoes.membro}\`.`)
          }
        }
        if (!command.permissoes.bot === []) {
          if (!command.permissoes.bot.every(p => message.channel.guild.members.get(global.star.user.id).permissions.has(p))) {
            return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.bot} \`${command.permissoes.bot}\`.`)
          }
        }
        if (command.permissoes.dono) {
          // Verificar se o autor da mensagem é um desenvolvedor.
          const developers = await global.db.get('devs')

          if (!developers) {
            await global.db.set('devs', ['717766639260532826', '630493603575103519'])
          }

          if (!developers.includes(message.member.id)) {
            return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.dev}`)
          }
        }
      }

      try {
        const botban = await global.db.get(`blacklist-${message.author.id}`)
        const pass = global.db.get(`pass-${message.author.id}`)

        if (botban) {
          if (!pass) {
            const banem = new global.star.manager.Ebl()
            banem.title('🛠️ Oops, you\'re banned!')
            banem.description(`You were banned from using me, for the reason: ${botban}, if you think your ban was unfair you can submit an [appeal](https://forms.gle/gQ1LT8LNX5LY3QYU9).`)
            banem.field('Reason for ban:', `\`\`\`\n${botban}\n\`\`\``)
            banem.thumbnail(global.star.user.avatarURL)
            banem.color('#ff0000')
            global.db.set(`pass-${message.author.id}`, Date.now())
            const dm = await global.star.getDMChannel(message.author.id)
            return dm.createMessage(banem.create).catch((e) => {
              message.channel.createMessage(banem.create)
            })
          } else {
            return
          }
        }

        let timeout = 3000
        if (message.author.id === '717766639260532826') {
          timeout = 0
        }
        // Caso tudo ocorra bem executar o comando.
        if (!cooldowns[message.author.id]) {
          cooldowns[message.author.id] = {
            lastCmd: null
          }
        }
        const ultimoCmd = cooldowns[message.author.id].lastCmd
        if (ultimoCmd != null && timeout - (Date.now() - ultimoCmd) > 0) {
          return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.c}`)
        } else {
          cooldowns[message.author.id].lastCmd = Date.now()
        }

        const cmds = await global.db.get('comandos')
        if (!cmds) {
          await global.db.set('comandos', 1)
        } else {
          await global.db.set('comandos', cmds + 1)
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
          send: function (texto) {
            message.channel.createMessage(texto)
          },
          reply: function (texto, mencionar) {
            message.channel.createMessage(texto, mencionar)
          },
          addReaction: function (emoji) {
            message.addReaction(emoji)
          },
          fetch: async function (url) {
            await global.star.manager.fetch(url)
          }
        }
        const owner = await global.star.getRESTUser(message.channel.guild.ownerID)
        const moment = require('moment')
        const embed2 = new global.star.manager.Ebl()
        embed2.title('<:st_website:830841154203025439> Log de Comandos')
        embed2.field('<:st_membros:845390325638889482> Usuário:', `\`\`\`${message.author.username}#${message.author.discriminator} (${message.author.id})\`\`\``)
        embed2.field('<:st_util_info:835532528617259068> Comando:', `\`\`\`${message.content.slice(0, 1010)}\`\`\``)
        embed2.field('<:st_link:845643800080416770> Link da mensagem:', `\`\`\`${message.jumpLink}\`\`\``)
        embed2.field('<:st_like:845646603368661002> GuildInfo:', `\`\`\`📋 Nome: ${message.channel.guild.name}\n🧭 ID: ${message.channel.guild.id} [${message.channel.guild.shard.id}]\n👑 ${owner.username}#${owner.discriminator}\n🧑 Membros: ${message.channel.guild.memberCount}\n📅 Criado há dias/horas: ${moment(message.channel.guild.createdAt).format('📆 DD/MM/YY')}\n${moment(message.channel.guild.createdAt).format('⏰ HH:mm:ss')}\n🗺️ Região: ${message.channel.guild.region}\`\`\``)
        embed2.color('#dd3af0')
        embed2.thumbnail(message.channel.guild.iconURL || global.star.user.avatarURL)
        const log = await global.star.getRESTChannel('829530412350308392')
        log.createMessage(embed2.create)
        return command.run(this.ctx).catch((erro) => {
          console.log(`[ERRO] Deu ruim:\n${erro}`.red)
          const embed = new global.star.manager.Ebl()
          embed.title(`${idioma.message.e}`)
          embed.description(`\`\`\`js\n${erro}\n\`\`\``)
          embed.field(`${idioma.message.e2}`, `${idioma.message.e3}`)
          embed.color('#ff0000')
          embed.thumbnail(global.star.user.avatarURL)
          return message.channel.createMessage(embed.create)
        })
      } catch (erro) {
        const embed = new global.star.manager.Ebl()
        embed.title(`${idioma.message.e}`)
        embed.description(`\`\`\`js\n${erro}\n\`\`\``)
        embed.field(`${idioma.message.e2}`, `${idioma.message.e3}`)
        embed.color('#ff0000')
        embed.thumbnail(global.star.user.avatarURL)
        return message.channel.createMessage(embed.create)
      }
    }
  }
}

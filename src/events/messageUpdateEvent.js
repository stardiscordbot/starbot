'use strict'

const config = require('../config/config')
const system = require('../config/system')
module.exports = class MessageEvent {
  constructor () {
    return {
      nome: 'messageUpdate',
      run: this.run
    }
  }

  async run (message, oldMessage) {
    if (message.channel.type === 1 || message.author.bot) return
    message.guild = message.channel.guild
    if (message.content === oldMessage.content) return
    // Definindo idioma.
    let idioma = require('../config/idiomas.js')
    let lang = (await global.db.get(`idioma-${message.guildID}`)) || 'pt_br'
    lang = lang.replace(/-/g, '_')
    idioma = idioma[lang]

    const anitlink = global.db.get(`antiinvite-${message.channel.guild.id}`)
    const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/
    if (regex.test(message.content) && anitlink) {
      if (message.member.permissions.has('manageGuild')) return
      message.channel.createMessage(`:x: ${message.author.mention} **|** Antilink está ativado aqui.`)
      message.delete()
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

    // Responder menção.
    if (message.content === `<@!${global.star.user.id}>` || message.content === `<@${global.star.user.id}>`) {
      const pr = await global.db.get(`prefix-${message.guildID}`) || 's!'
      const embed = new global.star.manager.Ebl()
      embed.title(`<:ES_panda:815580024811814913> ${idioma.message.P}`)
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
        if (command.permissoes.membro.length) {
          if (!command.permissoes.membro.every(p => message.channel.guild.members.get(message.author.id).permissions.has(p))) {
            return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.user} \`${command.permissoes.membro}\`.`)
          }
        }
        if (command.permissoes.bot.length) {
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

        const { Collection } = require('eris')
        const now = Date.now()

        if (!global.star.cooldowns2.has(command.pt.nome)) {
          await global.star.cooldowns2.set(command.pt.nome, new Collection())
        }

        const timestamps = global.star.cooldowns2.get(command.pt.nome)
        const cooldownAmoun = 5000
        const cooldownAmount = (timestamps.has(message.author.id) ? (Number(cooldownAmoun)) + cooldownAmoun : cooldownAmoun)

        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount

          if (now < expirationTime) {
            if (global.star.cooldowns.has(message.author.id)) {
              const time = await global.star.cooldowns.get(message.author.id)
              if (time > 35000) {
                await global.star.cooldowns.delete(message.author.id)
                if (message.author.id !== '717766639260532826') {
                  await global.star.cooldowns.delete(message.author.id)
                  await global.db.set(`blacklist-${message.author.id}`, 'Automatically - antispam system')
                } else {
                  await global.star.cooldowns.delete(message.author.id)
                }
              }
            }

            const quantidade = (global.star.cooldowns.has(message.author.id) ? global.star.cooldowns.get(message.author.id) : 0)

            await global.star.cooldowns.set(message.author.id, quantidade + 5000)
            const timeLeft = (expirationTime - now) / 1000

            return message.channel.createMessage(`:x: ${message.author.mention} **|** ${idioma.message.c.replace('%t', `**${timeLeft.toFixed(1)}**`)}`)
          }
        }
        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
        setTimeout(() => {
          global.star.cooldowns.delete(message.author.id)
        }, 120000)

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

        global.star.executeWebhook(system.command.id, system.command.token, {
          avatarURL: global.star.user.avatarURL,
          username: global.star.user.username,
          embeds: [{
            title: '<:st_website:830841154203025439> Log de Comandos',
            color: 14498544,
            fields: [
              {
                name: '<:ES_membros:815580090225262632> Usuário:',
                value: `\`\`\`${message.author.username}#${message.author.discriminator} (${message.author.id})\`\`\``
              },
              {
                name: '<:zu_info:911303533859590144> Comando:',
                value: `\`\`\`${message.content.slice(0, 1010)}\`\`\``
              },
              {
                name: '<:st_link:845643800080416770> Link da mensagem:',
                value: `\`\`\`${message.jumpLink}\`\`\``
              },
              {
                name: '<:st_like:845646603368661002> GuildInfo:',
                value: `\`\`\`📋 Nome: ${message.channel.guild.name}\n🧭 ID: ${message.channel.guild.id} [${message.channel.guild.shard.id}]\n👑 ${owner.username}#${owner.discriminator}\n🧑 Membros: ${message.channel.guild.memberCount}\n📅 Criado há dias/horas: ${moment(message.channel.guild.createdAt).format('📆 DD/MM/YY')}\n${moment(message.channel.guild.createdAt).format('⏰ HH:mm:ss')}\n🗺️ Região: ${message.channel.guild.region}\`\`\``
              }
            ]
          }]
        })
        // message.channel.createMessage(idioma.slash2)
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
        console.log(`[ERRO] Deu ruim:\n${erro}`.red)
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

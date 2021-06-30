module.exports = class Idioma {
  constructor () {
    return {
      permissoes: {
        membro: ['manageGuild'],
        bot: ['embedLinks', 'addReactions', 'useExternalEmojis', 'manageMessages'], // Permissoes que o bot necessita
        dono: false // Se apenas nos devs podem usar o comando
      },
      pt: {
        nome: 'painel',
        categoria: '⚙️ • Configuração',
        desc: 'Altera o idioma do bot.'
      },
      en: {
        nome: 'panel',
        categoria: '⚙️ • Configuration',
        desc: 'Changes the bot language.'
      },
      aliases: ['pan', 'panl'],
      run: this.run
    }
  }

  async run (ctx) {
    // eslint-disable-next-line no-unused-vars
    const ReactionCollector = require('../../Helpers/ReactionCollector')
    const MessageCollector = require('../../Helpers/MessageCollector')
    const embed = new global.star.manager.Ebl()
    embed.title(`<:st_config:845647892932067369> Config Panel • ${global.star.user.username}`)
    embed.description(`**${ctx.message.author.username}** Configure seu servidor por aqui!`)
    embed.field('<:st_one:859832790726737981> Sistema de Boas-Vindas:', 'Customize as mensagens de entrada de seu servidor, escolhendo canal, mensagem, embed, não-embed e cor da embed :)')
    embed.field('<:st_two:859832872868118558> Sistema de Boas-Vindas:', 'Customize as mensagens de entrada de seu servidor, escolhendo canal, mensagem, embed, não-embed e cor da embed :)')
    embed.field('<:st_three:859832939897159742> Sistema de Boas-Vindas:', 'Customize as mensagens de entrada de seu servidor, escolhendo canal, mensagem, embed, não-embed e cor da embed :)')
    embed.field('<:st_four:859833018901069854> Sistema de Boas-Vindas:', 'Customize as mensagens de entrada de seu servidor, escolhendo canal, mensagem, embed, não-embed e cor da embed :)')
    embed.thumbnail(global.star.user.avatarURL)
    embed.color('#dd3af0')
    ctx.message.channel.createMessage(embed.create).then(msg => {
      msg.addReaction(':st_one:859832790726737981')
      msg.addReaction(':st_two:859832872868118558')
      msg.addReaction(':st_three:859832939897159742')
      msg.addReaction(':st_four:859833018901069854')
      // Coletor para caso o usuário escolha configurar as boas vindas
      const wel = new ReactionCollector(msg, {
        user: ctx.message.author,
        ignoreBot: true,
        emoji: 'st_one',
        time: 60000,
        max: 1,
        acceptReactionRemove: false,
        stopOnCollect: true
      })
      // Caso o user queira configurar boas vindas
      wel.on('collect', (message) => {
        msg.delete()
        const embed2 = new global.star.manager.Ebl()
        embed2.title('📋 Passo 1: Mensagem')
        embed2.color('#dd3af0')
        embed2.description(`${ctx.idioma.welmsg.noargs.replace('%p', ctx.prefix).replace('%g', message.channel.guild.name).replace('%use', message.author.username).replace('%author', message.author.mention).replace('%mc', message.channel.guild.memberCount).replace('%ut', message.author.discriminator).replace('%id', message.author.id)}`)
        message.channel.createMessage(embed2.create).then(m1 => {
          const welmsg = new MessageCollector(m1.channel, {
            user: ctx.message.author,
            time: 60000,
            ignoreBots: true,
            stopOnCollect: true
          })
          welmsg.on('collect', (message) => {
            const embed3 = new global.star.manager.Ebl()
            embed3.title('📋 Passo 2: Embed ou Não?')
            embed3.description(`✅ ${message.author.mention} **|** Mensagem de boas vindas setada para:\n\n>>> ${message.content.replace(/{guild}/g, message.channel.guild.name).replace(/{member}/g, message.author.username).replace(/{@member}/g, message.author.mention).replace(/{memberCount}/g, message.channel.guild.memberCount).replace(/{member.discrim}/g, '').replace(/{member.id}/g, message.author.id)}`)
            embed3.field('<:st_wumpus:844541072855662593> Você deseja que essa mensagem seja enviada em embed?', '<:st_like:845646603368661002> › Sim\n<:st_deslike:845646620044951562> › Não')
            embed3.color('#dd3af0')
            message.channel.createMessage(embed3.create).then(m2 => {
              m2.addReaction(':st_like:845646603368661002')
              m2.addReaction(':st_deslike:845646620044951562')
              message.delete()
              m1.delete()
            })
          })
        })
      })
    })
  }
}

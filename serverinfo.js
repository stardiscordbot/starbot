const { MessageEmbed } = require('discord.js');
const config = require('./src/config.json')

module.exports.run = async (client, message, args, prefix) => {

    const region = {
      brazil: ':flag_br: Brazil',
      europe: 'Europa',
      hongkong: 'Hong Kong',
      india: 'Índia',
      japan: 'Japão',
      russia: 'Rússia',
      singapore: 'Singapore',
      southafrica: 'Africa do Sul',
      sydney: 'sydney',
      uscentral: 'US Central',
      useast: 'US East',
      ussouth: 'US Sul',
      uswest: 'US West'
    }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#f3f3f3')
            .setTitle(`${message.guild.name}`)
            .setDescription(`Servidor na shard ${message.guild.shard.id}`)
            .setFooter(`Comando Executado por ${message.author.tag} • Versão: ${config.versão}`, message.author.displayAvatarURL())
            .addFields(
                {
                    name: "<:owner:771775390707875850> Posse: ",
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "<:membros:771775720820310016> Membros: ",
                    value: `Esse servidor tem  ${message.guild.memberCount} membros`,
                    inline: true
                },
                {
                    name: "<:online:769404416649461761> Membros Online: ",
                    value: `Esse servidor tem ${message.guild.members.cache.filter(m => m.user.presence.status == "dnd").size} membros online!`,
                    inline: true
                },
                {
                    name: "<:bot:771776061481943111> Bots ",
                    value: `Esse servidor tem ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                    inline: true
                },
                {
                    name: "<:join_arrow:771777119955976202> Criado em: ",
                    value: message.guild.createdAt.toLocaleDateString("pt-br"),
                    inline: true
                },
                {
                    name: "<:wumpus:754739856436887712> Quantidade de cargos: ",
                    value: `Esse servidor tem ${message.guild.roles.cache.size}       cargos`,
                    inline: true,
                },
                {
                    name: `🗺 Região: `,
                    value: region[message.guild.region],
                    inline: true
                },
                {
                    name: `<:certified:771777298092654633> Verificação: `,
                    value: message.guild.verified ? 'Servidor verificado' : `Servidor não verificado`,
                    inline: true
                },
                {
                    name: '<a:boost:771777426636275743> Impulsos: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? ` Esse servidor tem ${message.guild.premiumSubscriptionCount} Boosts` : `Esse servidor não possui Impulsos`,
                    inline: true
                },
                {
                    name: "<:emoji:771777587965722644> Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `Esse servidor tem ${message.guild.emojis.cache.size} emojis!` : 'Esse server não tem emojis' ,
                    inline: true
                }
            )
        await message.quote(embed)
        
    }

exports.help = {
    name: 'serverinfo',
    aliases: ['si'],
    category: 'others'
}
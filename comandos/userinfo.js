const { MessageEmbed } = require('discord.js');
const bldb = require('../mongodb/blacklist')
const moment = require('moment');
moment.locale('pt-PT');

function getStatus(status) {
    let outStatus = status;
    if (status === 'idle') outStatus = 'Ausente';
    else if (status === 'dnd') outStatus = 'Ocupado';
    return outStatus;
}

function getDevice(user) {
    if (!user.presence.clientStatus) return null;
    const devices = Object.keys(user.presence.clientStatus);

    const deviceList = devices.map(device => {
        if (device === 'desktop')
            return ':computer:';
        else if (device === 'mobile')
            return ':mobile_phone:';
        else return ':globe_with_meridians:';
    });

    return deviceList.join(' - ');
}

module.exports.run = async (client,message,args) => {
        let user = message.mentions.users.first();

        if (!args.length) {
            user = message.author;
        } else {
            if (Number(args[0])) {
                user = await client.users.fetch(args[0]);
            }

            if (!user) {
                message.guild.members.cache.forEach(member => {
                    if (member.displayName === args.join(' '))
                        user = member.user;
                });
            }

            if (!user) {
                message.guild.members.cache.forEach(member => {
                    if (member.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase())) {
                        user = member.user;
                    }
                });
            }
        }

        if (!user) return message.channel.send(':x: Utilizador não encontrado!');
        bldb.findOne({_id:user.id}, (err, bl) => {
            if(bl) {
              const detectado = new MessageEmbed()
              .setTitle("<a:ban_cat:768210628913266689> | Usuário Banido")
              .setColor("ff0000")
              if(!bl.motivo) {
                detectado.setDecription(`\`${user.tag}\` está banido de ultilizar a Star:tm: por desrespeitar os termos de uso **Motivo:** \`Não Definido\``)
            } else if(bl.motivo) {
                detectado.setDescription(`\`${user.tag}\` está banido de ultilizar a Star:tm: por desrespeitar os termos de uso **Motivo:** \`${bl.motivo}\``)
            }
               return message.channel.send(detectado)
                }
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`${user.tag} ${user.bot ? '| BOT' : ''}`, user.displayAvatarURL({ dynamic: true }))
            .addField(':bookmark_tabs: Tag', `\`${user.tag}\``, true)
            .addField(':closed_book: ID', `\`${user.id}\``, true)
            .addField(':calendar: Conta criada em', `\`${moment(user.createdAt).format('L')} (${moment(user.createdAt).startOf('day').fromNow()})\``, true)
            .setTimestamp()
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));

        if (message.guild.members.cache.get(user.id)) {
            embed.addField(':calendar: Entrada no servidor', `\`${moment(message.guild.member(user).joinedAt).format('L')} (${moment(message.guild.member(user).joinedAt).startOf('day').fromNow()})\``, true)
                .addField(':shrug: Status', `\`${getStatus(user.presence.status)}\``, true);

            const device = getDevice(user);

            if (device) {
                embed.addField('Dispositivos :technologist:', device, true);
            }
        }

        return message.channel.send(embed);
    })
}
module.exports.help = {
  name: "userinfo",
  aliases: ['ui', 'userinfo', 'whois'],
  status: 'on'
}
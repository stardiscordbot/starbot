const { MessageEmbed } = require("discord.js");
const Fortnite = require("fortnite");
const config = require('../config.json')
const ft = new Fortnite(config.fort);

exports.run = async (client, message, args) => {
        try
        {
            await ft.store().then(async data=>
            {
                data.sort((a, b) =>
                {
                    return a.vbucks - b.vbucks;
                });

                let i = 0;
                while (true)
                {
                    let min = 25 * i;
                    let max = 25 * (i + 1);

                    if (min > data.length - 1) break;

                    let embed = new MessageEmbed()
                        .setColor("#6CC0EF")
                        .setAuthor("Loja do Fortine", "https://pm1.narvii.com/7370/91bac9568618da1c93b2f29927d5e006c3a11ee4r1-900-900v2_hq.jpg")
                        .setFooter('Apoie meu criador: ADG', 'https://cdn.discordapp.com/avatars/717766639260532826/a_09353dc3062ed272bb3125002022f963.gif?size=2048')
                        .setTimestamp();

                    let j;
                    for (j = min; j < max; j++)
                    {
                        if (j > data.length - 1) break;

                        let item = data[j];
                        embed.addField(`**${item.name}**`, `**Raridade:** ${item.rarity}\n**Preço:** ${item.vbucks} vbucks\n**Imagem:** [[Clique Aqui]](${item.image})`, true);
                    }

                    await message.quote(embed);
                    i++;
                }
            });
        }
        catch (err)
        {
            console.log(err);
        }
    }
    exports.help = {
        name: 'fnstore',
        aliases: ['fnshop'],
        status: 'on'
      }
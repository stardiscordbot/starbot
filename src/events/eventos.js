module.exports = (client) => {
client.on("message", async message => {
    const fa = await client.db.get(`fst-${message.guild.id}`)
    if(!fa) return;
    if(!message.guild) return;
    if(message.author.bot) return;
    const economy = require("../config/database/mongodb/economy");

    const fras = require("../../faustao.json");
    const rand = Math.floor(Math.random() * fras.frases.length);
    const frase = fras.frases[rand];

    const quantia = Math.floor(Math.random() * 10000);
    const fschanc = Math.floor(Math.random() * 90);
    const faustao = new (require("discord.js")).MessageEmbed()
    .setTitle(`<:st_random_faustao:833319957113995286> Domingão do Faustão`)
    .setDescription(`Olá caro usuário! Está afim de ganhar yens? Sabia que você pode ganhar de **0 à 400 Yens?** neste exato momento? Seja rápido e digite: \`${frase.noc}\``)
    .setImage("https://i.imgur.com/9uf04Fz.jpg")
    .setColor("BLUE")
    console.log(fschanc)
    if(fschanc == 84) return message.channel.send(faustao).then(m => {
        const filter = m => m.content.includes(frase.val);
        const collector = message.channel.createMessageCollector(filter, { time: 60000 });
        collector.on('collect', m => {
            economy.findOne({ User: m.author.id }, async(err, data)=>{
                if(!data) {
                    let newEconomy = new economy({
                        User: m.author.id,
                        Money: quantia,
                        Bank: 0,
                        Tag: message.author.tag,
                    }) 
                    newEconomy.save();
                }
                if(data) {
                    data.Money = eval(quantia + data.Money)
                    data.save()
                }
            })
	        m.react("✅")
            m.quote(`✅ ${m.author} **|** Parabéns, você ganhou **${quantia} yens**.`)
            collector.stop()
        });
        })
    })
}

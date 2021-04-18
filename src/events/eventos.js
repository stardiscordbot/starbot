module.exports = (client) => {
client.on("message", message => {
    if(!message.guild) return;
    if(message.author.bot) return;

    require("../../utils/quote")
    const fschanc = Math.floor(Math.random() * 50);
    const faustao = new (require("discord.js")).MessageEmbed()
    .setTitle(`<:st_random_faustao:833319957113995286> Domingão do Faustão`)
    .setDescription(`Olá caro usuário! Está afim de ganhar yens? Sabia que você pode ganhar de **0 à 400 Yens?** neste exato momento? Seja rápido e digite: \`tá ‌pegando ‌fogo ‌bixo\``)
    .setImage("https://i.imgur.com/9uf04Fz.jpg")
    .setColor("BLUE")
    console.log(fschanc)
    if(fschanc == 40) return message.channel.send(faustao).then(m => {
    })
})
}
const giveaway = require("../mongodb/giveaway");
const Discord = require("discord.js");
const pr = require("../mongodb/prefix");
const ms = require("ms");

module.exports.run = async(client, message, args) => {
    pr.findOne({name: "prefix", preid: message.guild.id}).then(res => {
    let prefix = res ? res.prefix : config.prefix;
  if(!args[0]) return message.reply(`ultilize, \`${prefix}giveaway start\`!`);
  if(args[0] == "start") {
    let t = parseInt(args[1]);
    let time = ms(args[1]);
    if(!time) return message.reply(`insira uma duração valida`)
    let winner = parseInt(args[2]);
    if(!winner) return message.reply(`insira um numero de jogadores válido`);
    let prize = args.slice(1).slice(1).slice(1).join(' ');
    message.reply("você quer um requisito para o sorteio?. Digite `role` se você quiser o requisito de cargo ou `server` se você quiser os requisitos do servidor ou `n` para nada.").then(c => {
      let filter = m => m.author.id === message.author.id;
      message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => {
        let reply = collected.first().content;
        if(reply === "n") {
          message.reply(`mencione o canal onde você quer que ocorra o sorteio`).then(cc => {
          message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collec => {
            if(collected.first().content) {
              console.log(collected.first().ment)
              
            }
          })/*.catch(() => {
            message.channel.send(`Looks like you're afk try again.`) 
          }) */
          })
        }
      })/*.catch(() => {
        message.channel.send(`Looks like you're afk. Use command again.`) 
      }) */
            });
        }
    })
}
exports.help = {
    name: 'giveaway',
    aliases: ['sorteio'],
    status: 'on'
  }
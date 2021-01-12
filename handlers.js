const {client} = require('./bot.js')
const {star} = require('./bot.js')
const Discord = require('discord.js')
const glob = require('glob')
const c = require('colors')
const fs = require('fs')
// Collection
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
// Embeds
const commandembed = new Discord.MessageEmbed()
.setTitle('Star™ | Status')
.setDescription('[COMANDOS] - Carregados com sucesso')
.setColor('ff0000')

const event = new Discord.MessageEmbed()
.setTitle('Star™ | Status')
.setDescription('[EVENTOS] - Carregados com sucesso')
.setColor('YELLOW')
// Handler
glob(__dirname+'/src/commands/*/*.js', function (er, files) {
    if(er) console.log(er)
    files.forEach(f => {
        let props = require(`${f.replace('.js', '')}`)
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
        });
        })
    console.log("[COMANDOS] - Carregados com sucesso".brightCyan)
    star.send(commandembed)
})

// Handler de Eventos
fs.readdir("./src/events/", (err, files) => {
  if(err)
      console.error(err);
  const eventsFiles = files.filter(file => file.split(".").pop() == "js");
  if(eventsFiles.length <= 0)
      return console.warn(c.brightRed("[EVENTS] - Não existem eventos para ser carregados"));
  eventsFiles.forEach((file, i) => {
      require("./src/events/" + file);
  })
  console.log(c.brightCyan("[EVENTOS] - Carregados com sucesso"))
  //star.send(event)
});
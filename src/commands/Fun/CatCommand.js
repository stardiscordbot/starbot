const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client,message,args) => {
  fetch('http://aws.random.cat//meow')
  .then(res => res.json())
  .then(json => message.quote({"embed": {
    "url": "https://discordapp.com",
    "color": 11733342,
    "image": {
      "url": json.file
    }
   
  }}));
}

module.exports.help = {
    name: "cat",
    aliases: ['kitty'],
    status: 'on',
    category: 'div'
}
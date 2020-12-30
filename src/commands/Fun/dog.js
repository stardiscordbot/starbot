const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client,message,args) => {
    fetch("https://random.dog/woof.json")
    .then(res => res.json())
    .then(json => {message.quote({"embed": {
        "url": "https://discordapp.com",
        "color": 11733342,
        "image": {
          "url": json.url
        }
       
      }})})
}

module.exports.help = {
    name: "doggo",
    aliases: ['dog'],
    category: 'div'
}
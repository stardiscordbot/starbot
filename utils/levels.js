const config = require("../src/config/json/config.json")
const Levels = require("discord-xp");

module.exports = (client) => {
    Levels.setURL(config.database.mongo.url)
    client.on("message", async (message) => {
        if (!message.guild) return;
        if (message.author.bot) return;
        
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
        if (hasLeveledUp) {
          const user = await Levels.fetch(message.author.id, message.guild.id);
          message.channel.send(`🥳 › ${message.author}, parabéns! Você subiu passou o nível **${user.level}**. :tada:`);
        }
      });
      
}